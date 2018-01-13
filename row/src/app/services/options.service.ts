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
  public fontIcons: {name:string, unicode:string}[];

  private _cardWidth:number;
  public set cardWidth(val:number){
    this._cardWidth = val;
    this.setResultWrapperPadding();
  }
  public get cardWidth():number{
    return this._cardWidth
  }
  public cardHeight;

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

  //Растянуть result по ширине контейнера
  private _isFullContainer: boolean;

  //Максимальная возможная ширина визитки
  private get maxAllowedWidth(): number {
    return Math.max(...this.settings.allowedSizes.map(s => s.width));
  }

  public set containerWidth(val: number) {
    this._isFullContainer = val < 600;
    this.settings.ratio = (val / this.maxAllowedWidth) * ((this._isFullContainer) ? 1 : 0.7);
  }

  //Отступы wrapper над result.component
  private _resultWrapperPadding:{
    'padding-top.px': number;
    'padding-bottom.px': number;
    'padding-left.px': number;
    'padding-right.px': number;
  };
  private setResultWrapperPadding(){
    let paddings = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };

    paddings.left = paddings.right = (this.maxAllowedWidth - this.cardWidth) / 2;
    if (paddings.left < 1) paddings.left = paddings.right = 0;
    paddings.top = paddings.bottom = (paddings.left < 20) ? paddings.left : 20;

    this._resultWrapperPadding = {
      'padding-top.px': paddings.top,
      'padding-bottom.px': paddings.bottom,
      'padding-left.px': paddings.left,
      'padding-right.px': paddings.right
    };
  }
  public get resultWrapperPadding() {
    return this._resultWrapperPadding;
  }

}
