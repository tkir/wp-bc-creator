import {AfterContentInit, Component, ElementRef} from '@angular/core';
import {OptionsService} from "../services/options.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'card-side-switch',
  templateUrl: './side-switch.component.html',
  styleUrls: ['./side-switch.component.css', '../css/tabs.css']
})
export class SideSwitchComponent implements AfterContentInit {
  private buttons: Element[];

  ngAfterContentInit(): void {
    this.buttons = this.el.nativeElement.querySelectorAll('button');
    (this.dataService.side == 'front') ? this.buttons[0].classList.add('active') : this.buttons[1].classList.add('active');
  }

  constructor(private el: ElementRef,
              public options: OptionsService,
              private dataService: DataService) {
  }

  private currentSide: string;

  changeTab(event, side) {
    this.dataService.changeSide(side);
    this.buttons.forEach(el => (el == event.target) ? el.classList.add('active') : el.classList.remove('active'));
  }

  setSideNum() {
    this.dataService.changeSideNumber((this.options.isDoubleSide) ? 'single' : 'double');
    this.buttons.forEach(el => el.classList.remove('active'));
    this.buttons[0].classList.add('active');
  }

}
