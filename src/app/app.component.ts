import { Component, OnDestroy } from '@angular/core';
import { ApiService } from './services/api.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'app';
  searchTerm = '';
  items: any[];
  loading = false;
  searchSub: Subscription;

  constructor(private api: ApiService) {
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
  }

  search(event: Event) {
    console.log('received change event:', event);
    if ( this.searchTerm.length < 3 ) { return; }
    this.loading = true;
    this.searchSub = this.api.searchFlickr(this.searchTerm).subscribe(
      (resp) => {
        this.loading = false;
        try {
          console.log(resp);
          // data availability check
          if (resp && resp._body && resp._body.items && resp._body.items.length > 0) {
            this.items = resp._body.items;
            // process tags into array
            this.items.map(item => {
              const tagArray = item.tags.split(' ');
              item.tags = tagArray.map((tagItem) => {
                return { value: tagItem, isSearchTerm: this.searchTerm.indexOf(tagItem) >= 0 ? true : false };
              });
            });
          } else {
            this.handleError(`Opps, your search for ${this.searchTerm} returned no results`, 'no-results');
          }
        } catch (e) {
          console.error('process error', e);
          this.handleError(`Opps, your search for ${this.searchTerm} returned process error`, 'process-error');
        }
      },
      (err) => {
        this.loading = false;
        console.error('service error', err);
        this.handleError(`Opps, your search for ${this.searchTerm} returned error`, 'search-error');
      }
    );
  }

  handleError (message: string, tag: string) {
    this.items = [{
      'title': message,
      'author': 'Flickr lover',
      'link': '#',
      'media': { 'm': '' },
      'tags': [{value: tag, isSearchTerm: true}]
    }];
  }
  keyup(event: any) {
    console.log('keyup event:', event);
    if (event.which === 13) {
      event.preventDefault();
      this.search(event);
    } else {
      return;
    }
  }

}
