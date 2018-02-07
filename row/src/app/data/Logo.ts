import {CardField} from "./interfaces";
import {OptionsService} from "../services/options.service";
import {Background} from "./Background";

export class Logo implements CardField {

  constructor(public src: string, dData, private options: OptionsService, private bg: Background) {
    Object.keys(dData).forEach(key => this[key] = dData[key]);
  }

  public width_mm: number;
  public height_mm: number;
  public left_mm: number;
  public top_mm: number;

  public isSelected: boolean;
  public dataType: string;

  private positionLimits: { left: number, top: number, right: number, bottom: number };
  public updatePositionLimits() {
    if (!this.bg) return;
    this.positionLimits = {
      left: this.bg.indent,
      top: this.bg.indent,
      right: this.bg.width - this.width - this.bg.indent,
      bottom: this.bg.height - this.height - this.bg.indent
    };
  }



  get width() {
    return Math.round(this.width_mm * this.options.settings.ratio);
  }
  set width(val) {
    if (val > this.bg.width - this.bg.indent) val = this.bg.width - this.bg.indent;
    this.width_mm = val / this.options.settings.ratio;

    this.updatePositionLimits();
  }

  get height() {
    return Math.round(this.height_mm * this.options.settings.ratio);
  }
  set height(val) {
    if (val > this.bg.height - this.bg.indent) val = this.bg.height - this.bg.indent;
    this.height_mm = val / this.options.settings.ratio;

    this.updatePositionLimits();
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

  get middle() {
    return Math.round(this.left + this.width / 2);
  }
  set middle(val) {
    this.left = val - Math.round(this.width / 2);
  }

  get right(): number {
    return Math.round(this.left + this.width);
  }
  set right(val) {
    this.left = val - this.width;
  }


  get maxWidth(): number {
    return this.bg.width * 0.8;
  }
  get maxHeight(): number {
    return this.bg.height * 0.8;
  }

  get instanceOf(): string {
    return 'Logo';
  }


  //TODO test after imposition
  public onChangeBgSize() {
    this.updatePositionLimits();

    this.left = this.left;
    this.top = this.top;
  }
  // public onChangeBgSize() {
  //   let maxSize = getMaxSize(this.instanceOf, this.bg);
  //   if (this.width > maxSize.x) this.width = maxSize.x;
  //   if (this.height > maxSize.y) this.height = maxSize.y;
  //
  //   let maxPosition = getMaxPosition(this.instanceOf, {width: this.width, height: this.height}, bg);
  //   if (maxPosition.x < this.left) this.left = maxPosition.x;
  //   if (maxPosition.y < this.top) this.top = maxPosition.y;
  //
  //   this.updatePositionLimits();
  // }

  get style() {
    return {
      'width.px': this.width,
      'height.px': this.height,
      'background-image': `url(${this.src})`,
      'background-size': 'cover'
    };
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

    this.updatePositionLimits();
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
