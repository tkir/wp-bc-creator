import {CardField} from "./interfaces";
import {getMaxPosition, getMaxSize} from "../utils/size.util";
import {OptionsService} from "../services/options.service";

export class Icon implements CardField {

  constructor(unicode: string, dData, private options:OptionsService) {
    this.unicode = unicode;
    Object.keys(dData).forEach(key => this[key] = dData[key]);
  }

  public unicode: string;
  public fontFamily: string = "FontAwesome";
  public fontSize_mm: number = 5;
  public colorStr: string = '000000';
  public left_mm: number;
  public top_mm: number;

  // private k: number = this.options.settings.ratio;
  private fontSizeStep: number = this.options.settings.fontSizeStep;

  public isSelected: boolean = false;
  public isStyling: boolean = false;
  public div: Element = null;

  public onChangeBgSize(bg: { width, height, indent }) {
    let max = getMaxSize(this.instanceOf, bg);
    if (this.width > max.x) this.width = max.x;
    if (this.height > max.y) this.height = max.y;

    let maxPosition = getMaxPosition(this.instanceOf, {width: this.width, height: this.height}, bg);
    if (maxPosition.x < this.left) this.left = maxPosition.x;
    if (maxPosition.y < this.top) this.top = maxPosition.y;
  }

  get style() {
    return {
      'font-family': this.fontFamily,
      'font-size.px': this.fontSize,
      'color': this.color
    }
  }

  get left() {
    return Math.round(this.left_mm * this.options.settings.ratio);
  }

  set left(val) {
    this.left_mm = val / this.options.settings.ratio;
  }

  get top() {
    return Math.round(this.top_mm * this.options.settings.ratio);
  }

  set top(val) {
    this.top_mm = val / this.options.settings.ratio;
  }

  get fontSize(): number {
    return Math.round(this.fontSize_mm * this.options.settings.ratio);
  }

  set fontSize(val: number) {
    this.fontSize_mm = val / this.options.settings.ratio;
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
    return 'Icon';
  }

  //для выравнивания
  get middle(): number {
    return this.left + Math.round(parseInt(getComputedStyle(this.div).width) / 2);
  }

  set middle(val) {
    this.left += val - this.middle;
  }

  get right(): number {
    return this.left + parseInt(getComputedStyle(this.div).width);
  }

  set right(val) {
    this.left += val - this.right;
  }

  get fontName(): string {
    return this.fontFamily;
  }

  get width() {
    return parseInt(getComputedStyle(this.div).width);
  }

  set width(val) {
  }

  get height() {
    return parseInt(getComputedStyle(this.div).height);
  }

  set height(val) {
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
