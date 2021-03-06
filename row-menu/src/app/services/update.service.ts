import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {OptionsService} from './options.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UpdateService {

  constructor(private api: ApiService,
              private options: OptionsService) {
  }

  public generalUpdate(page_url, hash, email, templValue, lnAbbreviation) {
    const path = '/general';

    if (this.options.page_url != page_url.trim()) {
      this.api.get(`${path}/page_url/${page_url}`)
        .subscribe(url => this.options.page_url = url);
    }

    if (this.options.hash != hash.trim()) {
      this.api.get(`${path}/hash/${hash}`)
        .subscribe(h => this.options.hash = h);
    }

    if (this.options.email != email.trim()) {
      this.api.get(`${path}/email/${email}`)
        .subscribe(e => this.options.email = e);
    }

    if (this.options.allowedTemplates.find(t => t.isActive).value != templValue) {
      this.api.get(`${path}/template/${templValue}`)
        .subscribe(templ =>
          this.options.allowedTemplates.forEach(t =>
            t.value == templ ? t.isActive = true : t.isActive = false));
    }

    if (this.options.allowedLanguages.find(l => l.isActive).abbreviation != lnAbbreviation) {
      this.api.get(`${path}/language/${lnAbbreviation}`)
        .subscribe(ln =>
          this.options.allowedLanguages.forEach(l =>
            l.abbreviation == ln ? l.isActive = true : l.isActive = false));
    }
  }

  public previewsUpdate(): Observable<any> {
    return this.api.post('/updateDesigns', this.options.previews);
  }

  public toggleActive(id): Observable<any> {
    return this.api.get(`/toggleActive/${id}`);
  }

  public defaultSelected(slug: string): Observable<any> {
    return this.api.get(`/updateDefault/${slug}`);
  }

  public updatePrice(price): Observable<any> {
    return this.api.post('/price', price);
  }

  public updateOrderOptions(options: Observable<any>) {
    return this.api.post('/options', options);
  }
}
