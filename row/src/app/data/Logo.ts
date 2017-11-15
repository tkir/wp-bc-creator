import {CardField} from "./interfaces";
import {getMaxPosition, getMaxSize} from "../utils/size.util";
import {OptionsService} from "../services/options.service";

export class Logo implements CardField {

  constructor(fData: string, dData, private options:OptionsService) {
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
  private k: number = this.options.settings.ratio;

  get style() {
    return {
      'width.px': this.width,
      'height.px': this.height,
      'background-image': `url(${this.src})`,
      'background-size': 'cover'
    };
  }

  get width() {
    return Math.round(this.width_mm * this.k);
  }

  set width(val) {
    this.width_mm = val / this.k;
  }

  get height() {
    return Math.round(this.height_mm * this.k);
  }

  set height(val) {
    this.height_mm = val / this.k;
  }

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

  public onChangeBgSize(bg: { width, height, indent }) {
    let maxSize = getMaxSize(this.instanceOf, bg);
    if (this.width > maxSize.x) this.width = maxSize.x;
    if (this.height > maxSize.y) this.height = maxSize.y;

    let maxPosition = getMaxPosition(this.instanceOf, {width: this.width, height: this.height}, bg);
    if (maxPosition.x < this.left) this.left = maxPosition.x;
    if (maxPosition.y < this.top) this.top = maxPosition.y;
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

  get designData() {
    return {
      width_mm: this.width_mm,
      height_mm: this.height_mm,
      left_mm: this.left_mm,
      top_mm: this.top_mm
    }
  }
}
