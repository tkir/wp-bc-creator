import {AfterContentInit, Component, ElementRef} from '@angular/core';
import {OptionsService} from "../services/options.service";

@Component({
  selector: 'card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements AfterContentInit{

  ngAfterContentInit(): void {
    this.options.containerWidth = parseInt(
      this.el.nativeElement
        .querySelector('.step4')
        .getBoundingClientRect().width
    );
  }

  constructor(private el:ElementRef,
              private options:OptionsService){}
}
