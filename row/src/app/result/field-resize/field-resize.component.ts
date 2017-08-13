import {Component} from '@angular/core';

import {getCoords, getMaxSize} from "../../utils/size.util";
import {CardField} from "../../data/interfaces";
import {Line} from "../../data/Line";

@Component({
  selector: 'card-field-resize',
  templateUrl: './field-resize.component.html',
  styleUrls: ['./field-resize.component.css'],
  host: {
    '[style.left.px]': 'this.item.width',
    '[style.top.px]': 'this.item.height',
    '[style.cursor]': 'cursor'
  }
})
export class FieldResizeComponent {

  private item: CardField = null;
  private el: Element = null;
  private background: any = null;
  private max: { x: number, y: number } = null;

  constructor() {
  }

  init(item, el, background) {
    this.item = item;
    this.el = el;
    this.background = background;

    this.updateMax();
  }

  updateMax() {
    this.max = getMaxSize(this.item.instanceOf, this.background);
  }

  get cursor(): string {
    switch (this.item.instanceOf) {
      case 'Logo':
        return 'nw-resize';
      case 'Line':
        return (<Line>this.item).isHorizontal ? 'e-resize' : 's-resize'
    }
  }

  resize(event: MouseEvent) {

    let coords = getCoords(this.item, this.el);

    if (this.item.width + this.item.left < this.max.x || event.pageX - coords.right < 0)
      if (this.item.width > 0 || event.pageX - coords.right > 0)
        this.item.width += event.pageX - coords.right;


    if (this.item.height + this.item.top < this.max.y || event.pageY - coords.bottom < 0)
      if (this.item.height > 0 || event.pageY - coords.bottom > 0)
        this.item.height += event.pageY - coords.bottom;
  }
}
