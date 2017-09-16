import {Injectable} from '@angular/core';
const bc_creator_menu_options: any = {
  nonce: '',
  path: 'http://localhost/',
  page_url: 'business-card-creator',
  hash: '',
  allowedTemplates: [
    {value: 'default', name: 'Default', isActive: false},
    {value: 'bc_creator', name: 'Full screen', isActive: true}
  ],
  previews:[]
};

@Injectable()
export class OptionsService {

  constructor() {
    Object.keys(bc_creator_menu_options).forEach(key => this[key] = bc_creator_menu_options[key]);
  }

  public nonce: string;
  path: string;
  public page_url: string;
  public hash: string;
  public allowedTemplates: [{ name: string, value: string, isActive: boolean }];
  public previews:[{id:number, Name:string, Slug:string, Description:string, Preview:string, isActive:boolean}];

}
