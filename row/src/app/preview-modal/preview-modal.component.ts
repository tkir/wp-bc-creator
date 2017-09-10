import {Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {PreviewService} from "../services/preview.service";

@Component({
  selector: 'card-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.scss']
})
export class PreviewModalComponent implements OnInit, OnDestroy {

  @Output() closeModal = new EventEmitter();
  private element: Element;

  constructor(@Inject(DOCUMENT) private document: any,
              private el: ElementRef,
              public previewService: PreviewService) {
  }

  ngOnInit() {
    this.element = this.el.nativeElement;
    this.document.body.appendChild(this.element);

    this.element.classList.add('active');
    this.element.querySelector('.bc-creator-modal-overlay')
      .classList.add('active');
  }

  ngOnDestroy(): void {
    this.previewService.modalClosed();
  }

  // open modal
  open(): void {
    this.document.body.classList.add('modal-open');
  }

  // close modal
  close() {
    this.document.body.classList.remove('modal-open');
    this.closeModal.emit();
  }
}
