import { Injectable } from '@angular/core';
declare const bc_creator_config:any;

@Injectable()
export class OptionsService {

  constructor() {
    Object.keys(bc_creator_config).forEach(key => this[key] = bc_creator_config[key]);
    this.setOrderOptions(this.orderOptions);
    this.price = Math.round(this.price * 100) / 100;
  }

  public nonce: string;
  public path: string;
  public defaultDesign:string;
  public settings:{
    "allowedFonts": string[],
    "allowedDesigns": string[],
    "allowedSizes": [{"width": number, "height": number}],
    "allowedHrDesigns": string[],
    "ratio": number,
    "fontSizeStep": number,
    "polygraphPadding": number,
    "imageUpload": {
      "resizeQuality": number,
      "resizeType": string,
      "allowedExtensions": string[]
    }
  };
  public previews: [{ id: number, Name: string, Slug: string, Description: string, Preview: string, isActive: boolean }];
  public price: number;
  private orderOptions: any;
  private _OrderOptions: [{ id: number, Name: string, Values: [{ Value: string, Rate: string }] }];

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
