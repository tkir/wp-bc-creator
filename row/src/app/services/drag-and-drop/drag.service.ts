import {EventEmitter, Injectable} from '@angular/core';
import {getElemCoords} from "../../utils/size.util";

@Injectable()
export class DragService {

  public dragObjEvent: EventEmitter<DragObject> = new EventEmitter();
  public dragObjStartEvent:EventEmitter<DragObject>=new EventEmitter();
  public dropObjEvent:EventEmitter<DragObject>=new EventEmitter();



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
    this.shiftX = this.startX - coords.left;
    this.shiftY = this.startY - coords.top;
  }
  public moveAvatar(newX: number, newY: number) {
    this._avatar.style.left = `${newX - this.shiftX}px`;
    this._avatar.style.top = `${newY - this.shiftY}px`;
  }
  public deleteAvatar(){
    this._avatar.remove();
    this._avatar = null;
  }

  public startX: number;
  public startY: number;
  private shiftX: number;
  private shiftY: number;


  startDrag(zone) {
    this.zone = zone;
  }

  accepts(zone: string) {
    return this.zone == zone;
  }

}

export class DragObject {
  constructor(public pageX: number,
              public pageY: number,
              public data: string,
              public zone?: string) {
  }
}
