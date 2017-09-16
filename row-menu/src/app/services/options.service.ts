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
  previews: [
    {"id": "1", "Name": "pageNotFound", "Slug": "pageNotFound", "Description": null, "Preview": null, "isActive": "1"},
    {
      "id": "2",
      "Name": "Design 2",
      "Slug": "des2",
      "Description": "",
      "Preview": "http://localhost/wordpress/wp-content/plugins/business-card-creator/img/-1/des2/preview.jpg",
      "isActive": "1"
    },
    {
      "id": "3",
      "Name": "Design 3",
      "Slug": "des3",
      "Description": "",
      "Preview": "http://localhost/wordpress/wp-content/plugins/business-card-creator/img/-1/des3/preview.jpg",
      "isActive": "1"
    }
  ],
  orderOptions: [
    {
      'id': 0,
      'Name': 'Quantity',
      'Values': '[{"Value":"100", "Rate":"1.0"},{"Value":"500", "Rate":"4.5"},{"Value":"1000", "Rate":"8.0"},{"Value":"2000", "Rate":"15.0"}]'
    }
  ]
};

@Injectable()
export class OptionsService {

  constructor() {
    Object.keys(bc_creator_menu_options).forEach(key => this[key] = bc_creator_menu_options[key]);
    this.setOrderOptions(this.orderOptions);
  }

  public nonce: string;
  path: string;
  public page_url: string;
  public hash: string;
  public allowedTemplates: [{ name: string, value: string, isActive: boolean }];
  public previews: [{ id: number, Name: string, Slug: string, Description: string, Preview: string, isActive: boolean }];
  private orderOptions: any;
  private _OrderOptions: [{ id: number, Name: string, Values: [{ Value: string, Rate: number }] }];

  public get OrderOptions() {
    return this._OrderOptions;
  }

  public setOrderOptions(val) {
    this.orderOptions = val;
    this._OrderOptions = this.orderOptions
      .map(option => {
        return {id: option.id, Name: option.Name, Values: JSON.parse(option.Values)};
      });
  }

}
