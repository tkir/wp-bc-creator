import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {Logo} from "../../data/Logo";
import {ImageService} from "../../services/image.service";

@Directive({
  selector: '[imageDroppable]',
  host: {
    '(drag)': 'drag($event)',
    '(dragstart)': 'dragstart($event)',
    '(dragend)': 'dragend($event)',
    '(dragover)': 'dragover($event)',
    '(dragenter)': 'dragenter($event)',
    '(dragleave)': 'dragleave($event)',
    '(drop)': 'drop($event)'
  }
})
export class DroppableDirective implements OnInit {

  @Input() logoItem: Logo = null;

  constructor(private el: ElementRef,
              private imageService: ImageService) {
  }

  ngOnInit() {
    if (this.isAdvancedUpload())
      this.el.nativeElement.classList.add('has-advanced-upload');
  }

  private isAdvancedUpload() {
    return (('draggable' in this.el.nativeElement) ||
      ('ondragstart' in this.el.nativeElement && 'ondrop' in this.el.nativeElement)) &&
      'FormData' in window && 'FileReader' in window;
  }

  drag(event: Event) {
    this._stopPropagation(event);
  }

  dragstart(event: Event) {
    this._stopPropagation(event);
  }

  dragend(event: Event) {
    this._stopPropagation(event);
    this.el.nativeElement.classList.add('is-dragover');
  }

  dragover(event: Event) {
    this._stopPropagation(event);
    this.el.nativeElement.classList.add('is-dragover');
  }

  dragenter(event: Event) {
    this._stopPropagation(event);
    this.el.nativeElement.classList.add('is-dragover');
  }

  dragleave(event: Event) {
    this._stopPropagation(event);
    this.el.nativeElement.classList.add('is-dragover');
  }

  drop(event: any) {
    this._stopPropagation(event);

    this.el.nativeElement.classList.remove('has-advanced-upload');
    this.el.nativeElement.classList.remove('is-dragover');

    if (event.dataTransfer.files.length)
      this.imageService.uploadImage(event.dataTransfer.files[0], true)
        .then(res => {
          this.logoItem.height = res.resized.height;
          this.logoItem.width = res.resized.width;
          this.logoItem.src = res.resized.dataURL;
        })
  }

  private _stopPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
