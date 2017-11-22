import {Injectable} from '@angular/core';
declare const bc_creator_config: any;
// const bc_creator_config = {
//   "path": "http://localhost/wordpress/wp-json/business-card-creator",
//   "nonce": "9df5719af3",
//   "previews": [{
//     "id": "1",
//     "Name": "pageNotFound",
//     "Slug": "pageNotFound",
//     "Description": null,
//     "Preview": null,
//     "isActive": "1"
//   }, {
//     "id": "6",
//     "Name": "X-Box",
//     "Slug": "x-box",
//     "Description": "Test card with X-Box logo",
//     "Preview": "http://localhost/wordpress/wp-content/plugins/business-card-creator/img/-1/x-box/preview.jpg",
//     "isActive": "1"
//   }, {
//     "id": "7",
//     "Name": "NASA",
//     "Slug": "NASA",
//     "Description": "Test card with NASA logo",
//     "Preview": "http://localhost/wordpress/wp-content/plugins/business-card-creator/img/-1/NASA/preview.jpg",
//     "isActive": "1"
//   }, {
//     "id": "8",
//     "Name": "Penguin",
//     "Slug": "Penguin",
//     "Description": "Test black & white card with Penguin logo",
//     "Preview": "http://localhost/wordpress/wp-content/plugins/business-card-creator/img/-1/Penguin/preview.jpg",
//     "isActive": "1"
//   }, {
//     "id": "9",
//     "Name": "Arabian",
//     "Slug": "Arabian",
//     "Description": "Test vertical card with Arabian logo",
//     "Preview": "http://localhost/wordpress/wp-content/plugins/business-card-creator/img/-1/Arabian/preview.jpg",
//     "isActive": "1"
//   }],
//   "defaultDesign": "x-box",
//   "settings": {
//     "allowedFonts": ["Work Sans", "Playfair Display", "Open Sans", "Josefin Slab", "Arvo", "Lato"],
//     "allowedDesigns": ["default", "des1", "des2"],
//     "allowedSizes": [{"width": 85, "height": 55}, {"width": 55, "height": 85}],
//     "allowedHrDesigns": ["solid", "dashed", "dotted", "double"],
//     "ratio": 7,
//     "fontSizeStep": 0.2,
//     "polygraphPadding": 5,
//     "imageUpload": {"resizeQuality": 1, "resizeType": "image/png", "allowedExtensions": ["jpg", "jpeg", "png"]}
//   },
//   "orderOptions": [{
//     "id": "1",
//     "Name": "Quantity",
//     "Values": "[{\"Value\":\"100\",\"Rate\":\"1.0\"},{\"Value\":\"500\",\"Rate\":\"4.5\"},{\"Value\":\"1000\",\"Rate\":\"8.0\"},{\"Value\":\"2000\",\"Rate\":\"15.0\"}]"
//   }],
//   "price": "100"
// };

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
  private hints;

  public cardWidth:number;
  public cardHeight:number;

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

  public setOrderOptionsDefaultValues(){
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
