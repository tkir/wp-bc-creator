import {CardField} from "./interfaces";
// import {getMaxPosition} from "../utils/size.util";
import {OptionsService} from "../services/options.service";
import {Background} from "./Background";

export class Icon implements CardField {

  constructor(public unicode: string, dData, private options: OptionsService, private bg:Background) {
    Object.keys(dData).forEach(key => this[key] = dData[key]);
  }

  public fontFamily: string = "FontAwesome";
  public fontSize_mm: number = 5;
  public colorStr: string = '000000';
  public left_mm: number;
  public top_mm: number;

  public isSelected: boolean = false;
  public isStyling: boolean = false;

  private _div: HTMLElement = null;
  public set div(val) {
    this._div = val;
    this.updatePositionLimits();
  }
  public positionLimits: { left: number, top: number, right: number, bottom: number };
  private updatePositionLimits() {
    if (!this.bg) return;

    this._width = this._div ? parseInt(getComputedStyle(this._div).width) : 0;
    this._height = this._div ? parseInt(getComputedStyle(this._div).height) : 0;
    this.positionLimits = {
      left: this.bg.indent,
      top: this.bg.indent,
      right: this.bg.width - this._width - this.bg.indent,
      bottom: this.bg.height - this._height - this.bg.indent
    };
    this.left = this.left;
    this.top = this.top;
  }

  //TODO test after imposition
  public onChangeBgSize() {
    this.updatePositionLimits();

    this.left = this.left;
    this.top = this.top;
  }

  get left() {
    return Math.round(this.left_mm * this.options.settings.ratio);
  }
  set left(val) {
    if (!this.positionLimits) this.updatePositionLimits();
    if (val < this.positionLimits.left) val = this.positionLimits.left;
    if (val > this.positionLimits.right) val = this.positionLimits.right;

    this.left_mm = val / this.options.settings.ratio;
  }

  get top() {
    return Math.round(this.top_mm * this.options.settings.ratio);
  }
  set top(val) {
    if (!this.positionLimits) this.updatePositionLimits();
    if (val < this.positionLimits.top) val = this.positionLimits.top;
    if (val > this.positionLimits.bottom) val = this.positionLimits.bottom;

    this.top_mm = val / this.options.settings.ratio;
  }

  get middle(): number {
    return this.left + Math.round(this.width / 2);
  }
  set middle(val) {
    // if (!this.positionLimits) this.updatePositionLimits();
    // if(val - Math.round(this.width / 2) < this.positionLimits.left) val = this.positionLimits.left + Math.round(this.width / 2);
    // if(val - Math.round(this.width / 2) > this.positionLimits.right) val = this.positionLimits.right + Math.round(this.width / 2);

    this.left = val - Math.round(this.width / 2);
  }

  get right(): number {
    return this.left + this.width;
  }
  set right(val) {
    // if (!this.positionLimits) this.updatePositionLimits();
    // if (val - this.width > this.positionLimits.right) val = this.positionLimits.right + this.width;
    // if (val - this.width < this.positionLimits.left) val = this.positionLimits.left + this.width;

    this.left = val - this.width;
  }

  private _width:number;
  get width() {
    if (!this._width) this.updatePositionLimits();
    return this._width;
  }
  // set width(val) {
  // }

  private _height;
  get height() {
    if (!this._height) this.updatePositionLimits();
    return this._height
  }
  // set height(val) {
  // }

  get fontSize(): number {
    return Math.round(this.fontSize_mm * this.options.settings.ratio);
  }
  set fontSize(val: number) {
    this.fontSize_mm = val / this.options.settings.ratio;
    this.updatePositionLimits();
  }
  public changeFontSize(dir: string) {
    if (dir == 'increase') this.fontSize_mm += this.options.settings.fontSizeStep;
    if (dir == 'decrease') this.fontSize_mm -= this.options.settings.fontSizeStep;
  }

  get color(): string {
    return `#${this.colorStr}`;
  }
  set color(val) {
    this.colorStr = val.replace('#', '');
  }

  get fontName(): string {
    return this.fontFamily;
  }

  get instanceOf(): string {
    return 'Icon';
  }

  get style() {
    return {
      'font-family': this.fontFamily,
      'font-size.px': this.fontSize,
      'color': this.color
    }
  }

  get json() {
    return {
      text: this.unicode,
      fontFamily: this.fontFamily,
      fontSize_mm: this.fontSize_mm,
      color: this.color,
      left_mm: this.left_mm,
      top_mm: this.top_mm
    }
  }

  get designData() {
    return {
      fontFamily: this.fontFamily,
      fontSize_mm: this.fontSize_mm,
      colorStr: this.colorStr,
      left_mm: this.left_mm,
      top_mm: this.top_mm
    }
  }

  set json(val) {
    this.fontFamily = val.fontFamily;
    this.fontSize_mm = val.fontSize_mm;
    this.color = val.color;
    this.left_mm = val.left_mm;
    this.top_mm = val.top_mm;
  }
}
