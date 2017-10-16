import { By } from '@angular/platform-browser';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';

describe('AppComponent', () => {
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
        ApiService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a navbar-brand class', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    console.log(compiled.querySelector('.navbar-brand'));
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('Angular 4 - Flickr Search');
  }));

  it('should call keyup function when fire keyup event', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;
    const keyupSpy = spyOn(comp, 'keyup');
    const searchSpy = spyOn(comp, 'search').and.callThrough();

    let searchInput:  HTMLInputElement;
    searchInput = fixture.debugElement.query(By.css('input')).nativeElement;
    console.log(searchInput);

    // searchInput.value = 'apple';
    searchInput.dispatchEvent(new Event('input'));
    comp.searchTerm = 'apple';
    // Tell Angular to update the output span through the title pipe
    fixture.detectChanges();
    console.log('comp.searchTerm:', comp.searchTerm);
    console.log('comp.searchTerm:', searchInput.value);
    // const keyupEvent = new KeyboardEvent('keyup', {
    //   key: 'Enter'
    // });
    const keyupEvent: any = document.createEvent('CustomEvent');
    keyupEvent.key = 'Enter';
    keyupEvent.keyCode = 13;
    keyupEvent.which = 13;
    keyupEvent.initEvent('keyup', true, true);
    document.dispatchEvent(keyupEvent);
    console.log('keyupEvent', keyupEvent);
    searchInput.dispatchEvent(keyupEvent);
    fixture.detectChanges();

    expect(keyupSpy).toHaveBeenCalled();
  }));
  it('should call search when keyup function is called with keycode 13', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;
    const searchSpy = spyOn(comp, 'search').and.callThrough();
    const keyupEvent: any = document.createEvent('CustomEvent');
    keyupEvent.key = 'Enter';
    keyupEvent.keyCode = 13;
    keyupEvent.which = 13;
    keyupEvent.initEvent('keyup', true, true);

    comp.keyup(keyupEvent);

    expect(searchSpy).toHaveBeenCalled();
  }));
});
