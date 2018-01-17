import {Injectable} from '@angular/core';
declare const bc_creator_menu_options: any;

@Injectable()
export class OptionsService {

  constructor() {
    Object.keys(bc_creator_menu_options).forEach(key => this[key] = bc_creator_menu_options[key]);
    this.setOrderOptions(this.orderOptions);
    this.price = Math.round(this.price * 100) / 100;
  }

  public nonce: string;
  public path: string;
  public page_url: string;
  public hash: string;
  public email: string;
  public defaultDesign: string;
  public allowedTemplates: [{ name: string, value: string, isActive: boolean }];
  public allowedLanguages: [{name: string, abbreviation:string, isActive: boolean }];
  public previews: [{ id: number, Name: string, Slug: string, Description: string, Preview: string, isActive: boolean }];
  public price: number;
  private orderOptions: any;
  private _OrderOptions: [{ id: number, type:string, Name: string, Values: [{ Value: string, Rate: string }] }];

  public get OrderOptions() {
    return this._OrderOptions;
  }

  public setOrderOptions(val) {
    this.orderOptions = val;

    this._OrderOptions = this.orderOptions
      .map(option => {
        return {id: option.id, type:option.OptionType, Name: option.Name, Values: JSON.parse(option.Values)};
      });
  }

}
