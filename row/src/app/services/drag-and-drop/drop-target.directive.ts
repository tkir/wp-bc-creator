import {AfterContentInit, Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {DragObject, DragService} from './drag.service'
import {getElemCoords} from "../../utils/size.util";

@Directive({
  selector: '[DropTarget]'
})
export class DropTargetDirective implements AfterContentInit {

  private options: DropTargetOptions = {};
  private isDragObjIN = false;
  private coords: { left: number, top: number, right: number, bottom: number } = null;

  constructor(private dragService: DragService,
              private el: ElementRef) {
  }

  ngAfterContentInit() {
    this.coords = getElemCoords(this.el.nativeElement);

    this.dragService.dragObjStartEvent.subscribe((dragObj: DragObject) => {
      this.el.nativeElement.classList.add('drop-wait');
    });

    this.dragService.dragObjEvent.subscribe((dragObj: DragObject) => {
      if (dragObj.left >= this.coords.left && dragObj.right <= this.coords.right &&
        dragObj.top >= this.coords.top && dragObj.bottom <= this.coords.bottom) {
        if (!this.isDragObjIN) {
          this.isDragObjIN = true;
          this.el.nativeElement.classList.add('drag-in');
        }
      } else {
        if (this.isDragObjIN) {
          this.isDragObjIN = false;
          this.el.nativeElement.classList.remove('drag-in');
        }
      }
    });

    this.dragService.dropObjEvent.subscribe((dragObj: DragObject) => {
      this.el.nativeElement.classList.remove('drop-wait');
      this.el.nativeElement.classList.remove('drag-in');

      if (this.isDragObjIN) {
        dragObj.left -= this.coords.left;
        dragObj.top -= this.coords.top;
        dragObj.right -= this.coords.left;
        dragObj.bottom -= this.coords.top;


        this.drop.emit(dragObj);
      }
    })
  }

  @Input()
  set DropTarget(options: DropTargetOptions) {
    this.options = options;
  }

  @Output('dropEvent')
  drop: EventEmitter<any> = new EventEmitter();

}

export interface DropTargetOptions {
  zone?: string;
}
