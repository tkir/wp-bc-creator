import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {OptionsService} from './options.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UpdateService {

  constructor(private api: ApiService,
              private options:OptionsService) { }

  public generalUpdate(page_url, hash, templValue) {
    const path='general';

    if (this.options.page_url != page_url.trim()) {
      this.api.post(`${path}/page_url`, page_url)
        .subscribe(url => this.options.page_url = url);
    }

    if (this.options.hash != hash.trim()) {
      this.api.post(`${path}/hash`, hash)
        .subscribe(h => this.options.hash = h);
    }

    if (this.options.allowedTemplates.find(t => t.isActive).value != templValue) {
      this.api.post(`${path}/template`, templValue)
        .subscribe(templ =>
          this.options.allowedTemplates.forEach(t =>
            t.value == templ ? t.isActive = true : t.isActive = false));
    }
  }

  public previewsUpdate():Observable<any>{
    return this.api.post('/updateDesigns', this.options.previews);
  }

  public toggleActive(id){
    return this.api.get(`/toggleActive/${id}`);
  }

  public updatePrice(price){
    return this.api.post('/price', price);
  }

  public updateOrderOptions(options){
    return this.api.post('/options', options);
  }
}
