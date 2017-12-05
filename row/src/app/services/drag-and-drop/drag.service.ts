import {EventEmitter, Injectable} from '@angular/core';
import {getElemCoords} from "../../utils/size.util";

@Injectable()
export class DragService {

  public dragObjEvent: EventEmitter<DragObject> = new EventEmitter();
  public dragObjStartEvent: EventEmitter<DragObject> = new EventEmitter();
  public dropObjEvent: EventEmitter<DragObject> = new EventEmitter();


  public zone: string = 'test';

  private startX: number;
  private startY: number;
  private _shift: { left: number, top: number, right: number, bottom: number };
  public setShift(el:HTMLElement, pageX, pageY){
    this.startX = pageX;
    this.startY = pageY;

    let coords = getElemCoords(el);
    this._shift = {
      left: this.startX - coords.left,
      top: this.startY - coords.top,
      right: coords.right - this.startX,
      bottom: coords.bottom - this.startY
    };
  }



  public updateCoords(obj: DragObject, pageX, pageY) {
    obj.left = pageX - this._shift.left;
    obj.top = pageY - this._shift.top;
    obj.right = pageX + this._shift.right;
    obj.bottom = pageY + this._shift.bottom;
  }


  startDrag(zone) {
    this.zone = zone;
  }

  accepts(zone: string) {
    return this.zone == zone;
  }

}

export class DragObject {
  constructor(public data: { name: string, unicode: string },
              public left?: number,
              public top?: number,
              public right?: number,
              public bottom?: number,
              public zone?: string) {
  }
}
