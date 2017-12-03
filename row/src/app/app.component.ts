import {AfterContentInit, Component, ElementRef} from '@angular/core';
import {DataService} from "./services/data.service";

@Component({
  selector: 'business-card-editor',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './css/tabs.css']
})
export class AppComponent implements AfterContentInit {
  private buttons: Element[];
  private tabContents: any[];

  ngAfterContentInit(): void {
    this.tabContents = this.el.nativeElement.querySelectorAll('.tab-content');
    this.tabContents[0].classList.add('active');

    this.buttons = this.el.nativeElement.querySelectorAll('button');
    this.buttons[0].classList.add('active');
  }

  constructor(private el: ElementRef,
              public dataService: DataService) {
  }

  headChoice(event, choice: string) {
    this.buttons.forEach(el => (el == event.target) ? el.classList.add('active') : el.classList.remove('active'));
    this.tabContents.forEach(el => (el.dataset.tab == choice) ? el.classList.add('active') : el.classList.remove('active'));
  }

  onDrop(event){
    console.log(event);
  }

}
