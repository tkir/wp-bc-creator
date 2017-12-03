import {Directive, ElementRef, HostBinding, HostListener, Inject, Input} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {DragObject, DragService} from "./drag.service";

@Directive({
  selector: '[fieldDraggable]'
})
export class DraggableDirective {

  private opt: DraggableOptions = {};
  private dragObj: DragObject = null;
  private isDraging:boolean = false;

  constructor(@Inject(DOCUMENT) private document: any,
              private el: ElementRef,
              private dragService: DragService) {
  }

  @HostBinding('draggable')
  get draggable() {
    return true;
  }

  @Input()
  set fieldDraggable(opt: DraggableOptions) {
    this.opt = opt;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDoun(event) {
    this.dragService.startX = event.pageX;
    this.dragService.startY = event.pageY;

    this.dragService.setAvatar(this.el.nativeElement);

  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    this.document.body.appendChild(this.dragService.avatar);

    this.dragService.startDrag(this.opt.zone);
    event.dataTransfer.setData('Text', JSON.stringify(this.opt.data));

    this.dragObj = new DragObject(event.pageX, event.pageY, this.opt.data);
    this.dragService.dragObjStartEvent.emit(this.dragObj);
    this.isDraging = true;
  }

  @HostListener('drag', ['$event'])
  onDrag(event: DragEvent) {
    this.dragService.moveAvatar(event.pageX, event.pageY);

    this.dragObj.pageX = event.pageX;
    this.dragObj.pageY = event.pageY;
    this.dragService.dragObjEvent.emit(this.dragObj);
  }

  // @HostListener('window:mouseup', ['$event'])
  // onDrop(event:MouseEvent){console.log(event);
  //   if(!this.isDraging)return;
  //   this.isDraging = false;
  //
  //   this.dragObj.pageX = event.pageX;
  //   this.dragObj.pageY = event.pageY;
  //   this.dragService.dropObjEvent.emit(this.dragObj);
  // }
}

export interface DraggableOptions {
  zone?: string,
  data?: any
}

