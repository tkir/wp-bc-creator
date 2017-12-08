import {Injectable} from '@angular/core';

declare const bc_creator_config: any;

@Injectable()
export class OptionsService {

  constructor() {
    Object.keys(bc_creator_config).forEach(key => this[key] = bc_creator_config[key]);
    this.setOrderOptions(this.orderOptions);
    this.price = Math.round(this.price * 100) / 100;
  }

  public nonce: string;
  public path: string;
  public defaultDesign: string;
  public settings: {
    "allowedFonts": string[],
    "allowedDesigns": string[],
    "allowedSizes": [{ "width": number, "height": number }],
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
  private hints: string[];
  public fontIcons: { name: string, unicode: string }[];

  public cardWidth: number;
  public cardHeight: number;

  private orderOptions: any;
  private _OrderOptions: [{ id: number, type: string, Name: string, Values: [{ Value: string, Rate: string, isSelected: boolean }] }];
  public get OrderOptions() {
    return this._OrderOptions;
  }

  public isDoubleSide: boolean = true;

  public get Designs() {
    return this.previews.map(p => p['Slug']);
  }

  public get hint(): string {
    return this.hints[Math.floor(Math.random() * this.hints.length)];
  }

  public setOrderOptions(val) {
    this.orderOptions = val;

    this._OrderOptions = this.orderOptions
      .map(option => {
        return {id: option.id, type: option.OptionType, Name: option.Name, Values: JSON.parse(option.Values)};
      });

    this.setOrderOptionsDefaultValues();
  }

  public setOrderOptionsDefaultValues() {
    this._OrderOptions.forEach(o => {
      o.Values.forEach(v => v.isSelected = false);
      if (o.type == 'fixed') {
        o.Values[1].isSelected = this.isDoubleSide;
        o.Values[0].isSelected = !this.isDoubleSide;
      } else
        o.Values[0].isSelected = true;
    });
  }

}
