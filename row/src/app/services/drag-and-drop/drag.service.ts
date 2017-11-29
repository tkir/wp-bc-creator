import {Injectable} from '@angular/core';

@Injectable()
export class DragService {

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

    let coords = this.getCoords(el);
    this.shiftX = this.startX - coords.left;
    this.shiftY = this.startY - coords.top;
  }

  public moveAvatar(newX: number, newY: number) {
    this._avatar.style.left = `${newX - this.shiftX}px`;
    this._avatar.style.top = `${newY - this.shiftY}px`;
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

  private getCoords(elem: HTMLElement) {
    let box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  }

}
