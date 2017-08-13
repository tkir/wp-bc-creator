import {Directive, HostListener, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[cardAddResize]'
})
export class AddResizeDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
