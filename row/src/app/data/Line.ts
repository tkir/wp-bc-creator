import {CardField} from "./interfaces";
import {getMaxPosition, getMaxSize} from "../utils/size.util";
import {OptionsService} from "../services/options.service";

export class Line implements CardField {

  constructor(obj, private options: OptionsService) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
  }

  public left_mm: number;
  public top_mm: number;
  public length_mm: number;
  public _thickness: number;
  public isHorizontal: boolean = true;
  public design: string = 'solid';
  public colorStr: string = '000';

  // private k: number = this.options.settings.ratio;
  public isSelected: boolean = false;

  get left() {
    return Math.round(this.left_mm * this.options.settings.ratio);
  }

  set left(val) {
    this.left_mm = val / this.options.settings.ratio
  }

  get top() {
    return Math.round(this.top_mm * this.options.settings.ratio);
  }

  set top(val) {
    this.top_mm = val / this.options.settings.ratio;
  }

  get thickness() {
    return this.design == 'double' ? this._thickness + 2 : this._thickness;
  }

  set thickness(val) {
    this._thickness = val;
  }

  get width() {
    return this.isHorizontal ? Math.round(this.length_mm) * this.options.settings.ratio : 0;
  }

  set width(val) {
    if (this.isHorizontal)
      this.length_mm = val / this.options.settings.ratio;
  }

  get height() {
    return this.isHorizontal ? 0 : Math.round(this.length_mm * this.options.settings.ratio);
  }

  set height(val) {
    if (!this.isHorizontal)
      this.length_mm = val / this.options.settings.ratio;
  }

  get instanceOf(): string {
    return 'Line';
  }

  get color(): string {
    return `#${this.colorStr.replace('#', '')}`;
  }

  set color(val) {
    this.colorStr = val.replace('#', '');
  }

  get style() {
    let direction = this.isHorizontal ? 'top' : 'right';

    let _style = {};
    _style[`border-${direction}-style`] = this.design;
    _style[`border-${direction}-width.px`] = this.thickness;
    _style[`border-${direction}-color`] = this.color;
    this.isHorizontal ?
      _style['width.px'] = this.width :
      _style['height.px'] = this.height;
    _style['margin'] = 0;

    return _style;
  }

  public onChangeBgSize(bg: { width, height, indent }) {
    let max = getMaxSize(this.instanceOf, bg);
    if (this.width > max.x) this.width = max.x;
    if (this.height > max.y) this.height = max.y;

    let maxPosition = getMaxPosition(this.instanceOf, {width: this.width, height: this.height}, bg);
    if (maxPosition.x < this.left) this.left = maxPosition.x;
    if (maxPosition.y < this.top) this.top = maxPosition.y;
  }

  get json() {
    return {
      left_mm: this.left_mm,
      top_mm: this.top_mm,
      length_mm: this.length_mm,
      thickness: this.thickness,
      isHorizontal: this.isHorizontal,
      design: this.design,
      color: this.color
    }
  }

  set json(val) {
    this.color = val.color;
    this.left_mm = val.left_mm;
    this.top_mm = val.top_mm;
    this.length_mm = val.length_mm;
    this.thickness = val.thickness;
    this.isHorizontal = val.isHorizontal;
    this.design = val.design;
  }

  get designData() {
    return {
      left_mm: this.left_mm,
      top_mm: this.top_mm,
      length_mm: this.length_mm,
      _thickness: this._thickness,
      isHorizontal: this.isHorizontal,
      design: this.design,
      colorStr: this.colorStr
    }
  }
}
