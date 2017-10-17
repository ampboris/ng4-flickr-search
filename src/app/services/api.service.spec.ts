import { Subscription } from 'rxjs/Rx';
import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpModule,
        JsonpModule
      ],
      providers: [ApiService]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
  it('should be searchFlickr without error', inject([ApiService], (service: ApiService, done) => {
    const searchSub: Subscription = service.searchFlickr('apple').subscribe(
      (resp) => {
        console.log('searchFlickr', resp);
        expect(resp).not.toBeNull();
        expect(resp._body).toBeDefined();
        done();
      },
      (err) => {
        expect(err).toBeNull();
        done();
      }
    );
    // TODO: implement this test
  }));
  it('should has error when searchFlickr', inject([ApiService], (service: ApiService, done) => {
    service.FLICKR_SEARCH_URL = 'http://a/';
    const searchSub: Subscription = service.searchFlickr('apple').subscribe(
      (resp) => {
        expect(resp).toBeNull();
        done();
      },
      (err) => {
        console.log('error searchFlickr', err);
        expect(err).not.toBeNull();
        expect(err.message).toBeDefined();
        done();
      }
    );
    // TODO: implement this test
  }));
});
