import {Injectable} from '@angular/core';

declare const bc_creator_i18n: any;

@Injectable()
export class I18nService {

  constructor() {
    Object.keys(bc_creator_i18n).forEach(key => this[key] = bc_creator_i18n[key]);
  }

  get(str: string): any {
    return this[str] || '';
  }

}
