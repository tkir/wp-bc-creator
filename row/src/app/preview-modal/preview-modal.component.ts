import {Component, ElementRef, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {PreviewService} from "../services/preview.service";

@Component({
  selector: 'card-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.css']
})
export class PreviewModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: Element;

  constructor(@Inject(DOCUMENT) private document: any,
              private el: ElementRef,
              public previewService: PreviewService) {
  }

  ngOnInit() {
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    this.element = this.el.nativeElement;
    this.document.body.appendChild(this.element);
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
  }
}
