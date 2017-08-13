import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Logo} from "../../data/Logo";
import {ImageService} from "../../services/image.service";

@Directive({
  selector: '[imageDroppable]'
})
export class DroppableDirective implements OnInit {

  @Input() logoItem: Logo = null;

  constructor(private el: ElementRef,
              private imageService:ImageService) {
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

  @HostListener('drag', ['$event'])
  drag(event: Event) {
    this._stopPropagation(event);
  }

  @HostListener('dragstart', ['$event'])
  dragstart(event: Event) {
    this._stopPropagation(event);
  }

  @HostListener('dragend', ['$event'])
  dragend(event: Event) {
    this._stopPropagation(event);
    this.el.nativeElement.classList.add('is-dragover');
  }

  @HostListener('dragover', ['$event'])
  dragover(event: Event) {
    this._stopPropagation(event);
    this.el.nativeElement.classList.add('is-dragover');
  }

  @HostListener('dragenter', ['$event'])
  dragenter(event: Event) {
    this._stopPropagation(event);
    this.el.nativeElement.classList.add('is-dragover');
  }

  @HostListener('dragleave', ['$event'])
  dragleave(event: Event) {
    this._stopPropagation(event);
    this.el.nativeElement.classList.add('is-dragover');
  }

  @HostListener('drop', ['$event'])
  drop(event: any) {
    this._stopPropagation(event);

    this.el.nativeElement.classList.remove('has-advanced-upload');
    this.el.nativeElement.classList.remove('is-dragover');

    this.imageService.uploadImage(this.logoItem, event.dataTransfer.files[0]);
  }

  private _stopPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
