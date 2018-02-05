import {CardField} from "./interfaces";
import {getMaxPosition, getMaxSize} from "../utils/size.util";
import {OptionsService} from "../services/options.service";
import {Background} from "./Background";

export class TextField implements CardField {

  constructor(fData: string, dData, private options: OptionsService) {
    this.text = fData;
    Object.keys(dData).forEach(key => this[key] = dData[key]);
  }

  public text: string;
  public fontFamily: string;
  public fontSize_mm: number;
  public fontWeight: string;
  public fontStyle: string;
  public textDecoration: string;
  public colorStr: string;
  public left_mm: number;
  public top_mm: number;
  private fontSizeStep: number = this.options.settings.fontSizeStep;

  public isSelected: boolean = false;
  public isStyling: boolean = false;

  private bg: Background;
  private _div: HTMLElement = null;
  public get div(){return this._div;}
  public set div(val){
    this._div = val;
    this.updatePositionLimits(this.bg);
  }
  public positionLimits: { left: number, top: number, right: number, bottom: number };
  public updatePositionLimits(bg: Background) {
    this.bg = bg;
    if (!this.div || !this.bg) return;

    this._width = parseInt(getComputedStyle(this.div).width);
    this._height = parseInt(getComputedStyle(this.div).height);
    this.positionLimits = {
      left: this.bg.indent,
      top: this.bg.indent,
      right: this.bg.width - this._width - this.bg.indent,
      bottom: this.bg.height - this._height - this.bg.indent
    };
  }

  public onChangeBgSize(bg: Background) {
    if(!this.div)return;

    let maxPosition = getMaxPosition(this.instanceOf, {width: this.width, height: this.height}, bg);
    if (maxPosition.x < this.left) this.left = maxPosition.x;
    if (maxPosition.y < this.top) this.top = maxPosition.y;

    this.updatePositionLimits(bg);
  }

  get style() {
    return {
      'font-family': this.fontFamily,
      'font-size.px': this.fontSize,
      'font-weight': this.fontWeight,
      'font-style': this.fontStyle,
      'text-decoration': this.textDecoration,
      'color': this.color
    }
  }

  get left() {
    return Math.round(this.left_mm * this.options.settings.ratio);
  }

  set left(val) {
    if (val < this.positionLimits.left) val = this.positionLimits.left;
    if (val > this.positionLimits.right) val = this.positionLimits.right;

    this.left_mm = val / this.options.settings.ratio;
  }

  get top() {
    return Math.round(this.top_mm * this.options.settings.ratio);
  }

  set top(val) {
    if (val < this.positionLimits.top) val = this.positionLimits.top;
    if (val > this.positionLimits.bottom) val = this.positionLimits.bottom;

    this.top_mm = val / this.options.settings.ratio;
  }

  //для выравнивания
  get middle(): number {
    return this.left + Math.round(this.width / 2);
  }

  set middle(val) {
    if(val - Math.round(this.width / 2) < this.positionLimits.left) val = this.positionLimits.left + Math.round(this.width / 2);
    if(val - Math.round(this.width / 2) > this.positionLimits.right) val = this.positionLimits.right + Math.round(this.width / 2);

    this.left = val - Math.round(this.width / 2);
  }

  get right(): number {
    return this.left + this.width;
  }

  set right(val) {
    if (val - this.width > this.positionLimits.right) val = this.positionLimits.right + this.width;
    if (val - this.width < this.positionLimits.left) val = this.positionLimits.left + this.width;

    this.left = val - this.width;
  }
  get fontSize(): number {
    return Math.round(this.fontSize_mm * this.options.settings.ratio);
  }

  set fontSize(val: number) {
    this.fontSize_mm = val / this.options.settings.ratio;
    this.updatePositionLimits(this.bg);
  }

  changeFontSize(dir: string) {
    if (dir == 'increase') this.fontSize_mm += this.fontSizeStep;
    if (dir == 'decrease') this.fontSize_mm -= this.fontSizeStep;
  }

  get color(): string {
    return `#${this.colorStr}`
  }

  set color(val) {
    this.colorStr = val.replace('#', '');
  }

  get instanceOf(): string {
    return 'Text';
  }

  get fontName(): string {
    return this.fontFamily;
  }

  set fontName(val) {
    this.fontFamily = val;
    this.updatePositionLimits(this.bg);
  }

  private _width:number;
  get width() {
    if (!this._width) this.updatePositionLimits(this.bg);
    return this._width;
  }
  set width(val) {
  }

  private _height;
  get height() {
    if (!this._height) this.updatePositionLimits(this.bg);
    return this._height
  }
  set height(val) {
  }

  get json() {
    return {
      text: this.text,
      fontFamily: this.fontFamily,
      fontSize_mm: this.fontSize_mm,
      fontWeight: this.fontWeight,
      fontStyle: this.fontStyle,
      textDecoration: this.textDecoration,
      color: this.color,
      left_mm: this.left_mm,
      top_mm: this.top_mm
    }
  }

  set json(val) {
    this.text = val.text;
    this.fontFamily = val.fontFamily;
    this.fontSize_mm = val.fontSize_mm;
    this.fontWeight = val.fontWeight;
    this.fontStyle = val.fontStyle;
    this.textDecoration = val.textDecoration;
    this.color = val.color;
    this.left_mm = val.left_mm;
    this.top_mm = val.top_mm;

    this.updatePositionLimits(this.bg);
  }

  get designData() {
    return {
      fontFamily: this.fontFamily,
      fontSize_mm: this.fontSize_mm,
      fontWeight: this.fontWeight,
      fontStyle: this.fontStyle,
      textDecoration: this.textDecoration,
      colorStr: this.colorStr,
      left_mm: this.left_mm,
      top_mm: this.top_mm
    }
  }
}
