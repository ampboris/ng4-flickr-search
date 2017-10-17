import { MockApiService } from './services/mock-api.service';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  function generateEvent(eventName: string, key: string, keyCode: number): any {
      // create event object as input
      const event: any = document.createEvent('CustomEvent');
      event.key = key;
      event.keyCode = keyCode;
      event.which = keyCode;
      event.initEvent(eventName, true, true);
      return event;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        JsonpModule
      ],
      declarations: [
        AppComponent,
        FooterComponent
      ],
      providers: [
        { provide: ApiService, useClass: MockApiService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });


  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    expect(app.title).toEqual('app');
  }));

  it('should render title in a navbar-brand class', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    // console.log(compiled.querySelector('.navbar-brand'));
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('Angular 4 - Flickr Search');
  }));

  it('should call keyup function when fire keyup event', async(() => {
    const keyupSpy = spyOn(app, 'keyup');
    // dispatch keyup event from the element
    const searchInput:  HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const keyupEvent: any = generateEvent('keyup', 'Enter', 13);
    searchInput.dispatchEvent(keyupEvent);

    expect(keyupSpy).toHaveBeenCalled();
  }));

  it('should call search when keyup function is called with keycode 13', async(() => {
    const searchSpy = spyOn(app, 'search').and.callThrough();
    // create event object as input
    const keyupEvent: any = generateEvent('keyup', 'Enter', 13);
    app.keyup(keyupEvent);
    expect(searchSpy).toHaveBeenCalled();
  }));
  it('should not call search when keyup function is called with keycode not 13', async(() => {
    const searchSpy = spyOn(app, 'search').and.callThrough();
    // create event object as input
    const keyupEvent: any = generateEvent('keyup', 'Enter', 133);
    app.keyup(keyupEvent);
    expect(searchSpy).not.toHaveBeenCalled();
  }));
  it('should get data when searchTerm is longer than 3 letters', async(() => {
    const handleErrorSpy = spyOn(app, 'handleError').and.callThrough();
    const mock = new MockApiService();
    let errorCount = 0;
    Object.keys(mock.mockData).forEach((key, index) =>{
      app.searchTerm = key;
      app.search();
      if (mock.mockData[key].error) {
        errorCount = errorCount + 1;
      }
      expect(app.items).not.toBeNull();
      expect(app.items.length).toEqual(mock.mockData[key].itemCount);
      expect(handleErrorSpy).toHaveBeenCalledTimes(errorCount);
    });

    app.searchTerm = 'error';
    app.search();
    expect(app.items).not.toBeNull();
    expect(app.items.length).toEqual(1);
    expect(handleErrorSpy).toHaveBeenCalledTimes(errorCount + 1);
  }));
});
