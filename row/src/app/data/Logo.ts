import {CardField} from "./interfaces";
import {getMaxPosition, getMaxSize} from "../utils/size.util";
import {OptionsService} from "../services/options.service";
import {Background} from "./Background";

export class Logo implements CardField {

  constructor(fData: string, dData, private options: OptionsService) {
    this.src = fData;
    Object.keys(dData).forEach(key => this[key] = dData[key]);
  }

  public src: string;
  public width_mm: number;
  public height_mm: number;
  public left_mm: number;
  public top_mm: number;

  public isSelected: boolean;
  public dataType: string;
  private _maxWidth: number;
  private _maxHeight: number;

  private bg: Background;
  public positionLimits: { left: number, top: number, right: number, bottom: number };
  public updatePositionLimits(bg: Background) {
    this.bg = bg;
    if (!this.bg) return;
    this.positionLimits = {
      left: this.bg.indent,
      top: this.bg.indent,
      right: this.bg.width - this.width - this.bg.indent,
      bottom: this.bg.height - this.height - this.bg.indent
    };
  }

  get style() {
    return {
      'width.px': this.width,
      'height.px': this.height,
      'background-image': `url(${this.src})`,
      'background-size': 'cover'
    };
  }

  get width() {
    return Math.round(this.width_mm * this.options.settings.ratio);
  }

  set width(val) {
    this.width_mm = val / this.options.settings.ratio;
  }

  get height() {
    return Math.round(this.height_mm * this.options.settings.ratio);
  }

  set height(val) {
    this.height_mm = val / this.options.settings.ratio;
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

  get middle() {
    return Math.round(this.left + this.width / 2);
  }

  set middle(val) {
    this.left += val - this.middle;
  }

  get right(): number {
    return Math.round(this.left + this.width);
  }

  set right(val) {
    this.left += val - this.right;
  }

  public setMax(maxWidth, maxHeight) {
    this._maxWidth = maxWidth * 0.8;
    this._maxHeight = maxHeight * 0.8;
  }

  get maxWidth(): number {
    return this._maxWidth;
  }

  get maxHeight(): number {
    return this._maxHeight;
  }

  get instanceOf(): string {
    return 'Logo';
  }

  public onChangeBgSize(bg: Background) {
    let maxSize = getMaxSize(this.instanceOf, bg);
    if (this.width > maxSize.x) this.width = maxSize.x;
    if (this.height > maxSize.y) this.height = maxSize.y;

    let maxPosition = getMaxPosition(this.instanceOf, {width: this.width, height: this.height}, bg);
    if (maxPosition.x < this.left) this.left = maxPosition.x;
    if (maxPosition.y < this.top) this.top = maxPosition.y;

    this.updatePositionLimits(bg);
  }

  get json() {
    return {
      src: this.src,
      width_mm: this.width_mm,
      height_mm: this.height_mm,
      left_mm: this.left_mm,
      top_mm: this.top_mm
    }
  }

  set json(val) {
    this.src = val.src;
    this.width_mm = val.width_mm;
    this.height_mm = val.height_mm;
    this.left_mm = val.left_mm;
    this.top_mm = val.top_mm;
  }

  get designData() {
    return {
      width_mm: this.width_mm,
      height_mm: this.height_mm,
      left_mm: this.left_mm,
      top_mm: this.top_mm
    }
  }
}
