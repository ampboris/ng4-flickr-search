import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
@Injectable()
export class MockApiService {

  mockData = {
    emptyResp: {
      itemCount: 1,
      error: true
    },
    emptyBody: {
      _body: {},
      itemCount: 1,
      error: true
    },
    emptyItems: {
      _body: {
        items: []
      },
      itemCount: 1,
      error: true
    },
    hasInValidItem: {
      _body: {
        items: [
          {
            title: 'test',
            author: 'Flickr lover',
            link: '#',
            media: { 'm': '' },
          }
        ]
      },
      itemCount: 1,
      error: true
    },
    hasOneValidItem: {
      _body: {
        items: [
          {
            title: 'test',
            author: 'Flickr lover',
            link: '#',
            media: { 'm': '' },
            tags: 'hasOneValidItem fun'
          }
        ]
      },
      itemCount: 1,
      error: false
    },
    hasTwoValidItem: {
      _body: {
        items: [
          {
            title: 'test',
            author: 'Flickr lover',
            link: '#',
            media: { 'm': '' },
            tags: 'test fun'
          },
          {
            title: 'test',
            author: 'Flickr lover',
            link: '#',
            media: { 'm': '' },
            tags: 'test fun'
          }
        ]
      },
      itemCount: 2,
      error: false
    }
  };
  constructor() { }
  searchFlickr(queryString: string): Observable<any> {
    if (this.mockData[queryString]) {
      return Observable.of(this.mockData[queryString]);
    } else {
      return Observable.throw('error');
    }
  }
}
