import {Directive, ElementRef, HostBinding, HostListener, Inject, Input} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {DragObject, DragService} from "./drag.service";

declare const InstallTrigger: any;

@Directive({
  selector: '[fieldDraggable]'
})
export class DraggableDirective {

  private opt: DraggableOptions = {};
  private dragObj: DragObject = null;
  private isDragging: boolean = false;
  private isFF: boolean;

  constructor(@Inject(DOCUMENT) private document: any,
              private el: ElementRef,
              private dragService: DragService) {
    this.isFF = typeof InstallTrigger !== 'undefined';
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
    this.dragObj = null;
    this.dragService.setShift(this.el.nativeElement, event.pageX, event.pageY);
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {

    this.dragService.startDrag(this.opt.zone);
    event.dataTransfer.setData('Text', JSON.stringify(this.opt.data));

    this.dragObj = new DragObject(this.opt.data);
    this.dragService.updateCoords(this.dragObj, event.pageX, event.pageY);
    this.dragService.dragObjStartEvent.emit(this.dragObj);
    this.isDragging = true;
  }

  @HostListener('drag', ['$event'])
  onDrag(event: DragEvent) {
    if (this.isFF) return;

    this.dragService.updateCoords(this.dragObj, event.pageX, event.pageY);
    this.dragService.dragObjEvent.emit(this.dragObj);
  }

  @HostListener('dragend', ['$event'])
  onDrop(event: MouseEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;

    if (!this.isFF) this.dragService.updateCoords(this.dragObj, event.pageX, event.pageY);
    this.dragService.dragObjEvent.emit(this.dragObj);
    this.dragService.dropObjEvent.emit(this.dragObj);
  }

  @HostListener('window:dragover', ['$event'])
  onFF(event: DragEvent) {
    if (!this.isFF) return;
    if (!this.dragObj) return;

    this.dragService.updateCoords(this.dragObj, event.pageX, event.pageY);
    this.dragService.dragObjEvent.emit(this.dragObj);
  }
}

export interface DraggableOptions {
  zone?: string,
  data?: any
}

