import {AfterContentInit, Component, ElementRef} from '@angular/core';
import {GridService} from "../services/grid.service";

@Component({
  selector: 'card-graphics-container',
  templateUrl: './graphics-container.component.html',
  styleUrls: ['./graphics-container.component.css', '../css/tabs.css']
})
export class GraphicsContainerComponent implements AfterContentInit {
  private buttons: Element[];
  private tabContents: any[];

  ngAfterContentInit(): void {
    this.tabContents = this.el.nativeElement.querySelectorAll('.tab-content');
    this.tabContents[0].classList.add('active');

    this.buttons = this.el.nativeElement.querySelectorAll('button');
    this.buttons[0].classList.add('active');
  }

  constructor(private el: ElementRef,
              private gridService:GridService) {
  }

  changeTab(event, tab) {
    this.buttons.forEach(el => (el == event.target) ? el.classList.add('active') : el.classList.remove('active'));
    this.tabContents.forEach(el => (el.dataset.tab == tab) ? el.classList.add('active') : el.classList.remove('active'));
  }

  sgowGrid(){
    this.gridService.isGrid=!this.gridService.isGrid;
  }

}
