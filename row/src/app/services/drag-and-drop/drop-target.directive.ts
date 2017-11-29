import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {DragService} from './drag.service'

@Directive({
  selector: '[DropTarget]'
})
export class DropTargetDirective {

  private options: DropTargetOptions={};

  constructor(private dragService: DragService) {
  }

  @Input()
  set DropTarget(options: DropTargetOptions) {
    this.options = options;
  }

  @Output('dropEvent')
  drop: EventEmitter<any> = new EventEmitter();

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    if (this.dragService.accepts(this.options.zone))
      event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    const data = JSON.parse(event.dataTransfer.getData('Text'));

    this.drop.emit(data);
  }

}

export interface DropTargetOptions {
  zone?: string;
}
