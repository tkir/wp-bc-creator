import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {TextField} from "../../data/TextField";

@Directive({
  selector: '[fieldAlignable]'
})
export class AlignableDirective implements OnInit {

  @Input() item: TextField = null;

  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
    if (this.item) this.item.div = this.elRef.nativeElement.parentElement;
  }

}
