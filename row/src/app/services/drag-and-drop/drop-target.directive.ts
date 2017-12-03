import {AfterContentInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {DragObject, DragService} from './drag.service'
import {getElemCoords} from "../../utils/size.util";

@Directive({
  selector: '[DropTarget]'
})
export class DropTargetDirective implements AfterContentInit {

  private options: DropTargetOptions = {};
  private isDragObjIN = false;
  private coords = null;

  constructor(private dragService: DragService,
              private el: ElementRef) {
  }

  ngAfterContentInit() {
    this.dragService.dragObjStartEvent.subscribe((dragObj: DragObject) => {
      this.coords = getElemCoords(this.el.nativeElement);
      this.el.nativeElement.classList.add('drop-wait');
    });

    this.dragService.dragObjEvent.subscribe((dragObj: DragObject) => {
      if (dragObj.pageX >= this.coords.left && dragObj.pageX <= this.coords.right &&
          dragObj.pageY >= this.coords.top  && dragObj.pageY <= this.coords.bottom) {
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

      if(this.isDragObjIN)this.drop.emit(dragObj);
    })
  }

  @Input()
  set DropTarget(options: DropTargetOptions) {
    this.options = options;
  }

  @Output('dropEvent')
  drop: EventEmitter<any> = new EventEmitter();

  // @HostListener('dragenter', ['$event'])
  // @HostListener('dragover', ['$event'])
  // onDragOver(event: DragEvent) {//console.log(event.type);
  //   if (this.dragService.accepts(this.options.zone))
  //     event.preventDefault();
  // }

  // @HostListener('drop', ['$event'])
  // onDrop(event: DragEvent) {//console.log(event.type);
  //   const data = JSON.parse(event.dataTransfer.getData('Text'));
  //
  //   this.drop.emit(data);
  // }

}

export interface DropTargetOptions {
  zone?: string;
}
