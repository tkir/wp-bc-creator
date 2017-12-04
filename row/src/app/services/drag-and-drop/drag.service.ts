import {EventEmitter, Injectable} from '@angular/core';
import {getElemCoords} from "../../utils/size.util";

@Injectable()
export class DragService {

  public dragObjEvent: EventEmitter<DragObject> = new EventEmitter();
  public dragObjStartEvent: EventEmitter<DragObject> = new EventEmitter();
  public dropObjEvent: EventEmitter<DragObject> = new EventEmitter();


  public zone: string = 'test';

  private _avatar: HTMLElement = null;
  public get avatar(): HTMLElement {
    return this._avatar;
  }
  public setAvatar(el: HTMLElement) {
    this._avatar = <HTMLElement>el.cloneNode(true);
    this._avatar.draggable = false;
    this._avatar.style.position = 'absolute';
    this._avatar.style.zIndex = '1000';

    let coords = getElemCoords(el);
    this.shift = {
      left: this.startX - coords.left,
      top: this.startY - coords.top,
      right: coords.right - this.startX,
      bottom: coords.bottom - this.startY
    };
  }
  public moveAvatar(newX: number, newY: number) {
    this._avatar.style.left = `${newX - this.shift.left}px`;
    this._avatar.style.top = `${newY - this.shift.top}px`;
  }
  public deleteAvatar() {
    this._avatar.remove();
    this._avatar = null;
  }

  public startX: number;
  public startY: number;
  private shift: { left: number, top: number, right: number, bottom: number };


  public updateCoords(obj: DragObject, event) {
    obj.left = event.pageX - this.shift.left;
    obj.top = event.pageY - this.shift.top;
    obj.right = event.pageX + this.shift.right;
    obj.bottom = event.pageY + this.shift.bottom;
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
