import {CardField} from "./interfaces";
import {getMaxPosition, getMaxSize} from "../utils/size.util";
declare const bc_creator_config: any;

export class Line implements CardField {

  constructor(obj) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
  }

  public left_mm: number;
  public top_mm: number;
  public length_mm: number;
  public _thickness: number;
  public isHorizontal: boolean = true;
  public design: string = 'solid';
  public _color: string = '000';

  private k: number = bc_creator_config['settings']['ratio'];
  public isSelected: boolean = false;

  get left() {
    return Math.round(this.left_mm * this.k);
  }

  set left(val) {
    this.left_mm = val / this.k;
  }

  get top() {
    return Math.round(this.top_mm * this.k);
  }

  set top(val) {
    this.top_mm = val / this.k;
  }

  get thickness() {
    return this.design == 'double' ? this._thickness + 2 : this._thickness;
  }

  set thickness(val) {
    this._thickness = val;
  }

  get width() {
    return this.isHorizontal ? Math.round(this.length_mm) * this.k : 0;
  }

  set width(val) {
    if (this.isHorizontal)
      this.length_mm = val / this.k;
  }

  get height() {
    return this.isHorizontal ? 0 : Math.round(this.length_mm * this.k);
  }

  set height(val) {
    if (!this.isHorizontal)
      this.length_mm = val / this.k;
  }

  get instanceOf(): string {
    return 'Line';
  }

  get color(): string {
    return `#${this._color.replace('#', '')}`;
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

  get designData() {
    return {
      left_mm: this.left_mm,
      top_mm: this.top_mm,
      length_mm: this.length_mm,
      _thickness: this._thickness,
      isHorizontal: this.isHorizontal,
      design: this.design,
      _color: this._color
    }
  }
}
