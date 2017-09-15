import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
const bc_creator_menu_options: any = {
  nonce: '',
  path: 'http://localhost/',
  page_url: 'business-card-creator',
  hash: '',
  allowedTemplates: [
    {value: 'default', name: 'Default', isActive: false},
    {value: 'bc_creator', name: 'Full screen', isActive: true}
  ]
};

@Injectable()
export class OptionsService {

  constructor(private api: ApiService) {
    Object.keys(bc_creator_menu_options).forEach(key => this[key] = bc_creator_menu_options[key]);
  }

  public nonce: string;
  path: string;
  public page_url: string;
  public hash: string;
  public allowedTemplates: [{ name: string, value: string, isActive: boolean }];

  public generalUpdate(page_url, hash, templValue) {
    const path='general';

    if (this.page_url != page_url.trim()) {
      this.api.post(`${path}/page_url`, page_url)
        .subscribe(url => this.page_url = url);
    }

    if (this.hash != hash.trim()) {
      this.api.post(`${path}/hash`, hash)
        .subscribe(h => this.hash = h);
    }

    if (this.allowedTemplates.find(t => t.isActive).value != templValue) {
      this.api.post(`${path}/template`, templValue)
        .subscribe(templ =>
          this.allowedTemplates.forEach(t =>
            t.value == templ ? t.isActive = true : t.isActive = false));
    }
  }

}
