import {AfterContentInit, Component, ElementRef} from '@angular/core';
import {OptionsService} from "../services/options.service";
import {Store} from "../services/store";

@Component({
  selector: 'card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements AfterContentInit{

  ngAfterContentInit(): void {
    this.options.containerWidth = parseInt(
      this.el.nativeElement
        // .querySelector('.card-wrap')
        .getBoundingClientRect().width
    );
  }

  constructor(private el:ElementRef,
              private store: Store,
              private options:OptionsService){}
}
