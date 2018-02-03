import {AfterContentInit, Component, ElementRef} from '@angular/core';
import {DataService} from "./services/data.service";
import {I18nService} from "./services/i18n.service";

@Component({
  selector: 'business-card-editor',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './css/tabs.css']
})
export class AppComponent implements AfterContentInit {
  private buttons: HTMLElement[];
  private tabContents: HTMLElement[];

  ngAfterContentInit(): void {
    this.tabContents = this.el.nativeElement.querySelectorAll('.tab-content');
    this.tabContents[0].classList.add('active');

    this.buttons = this.el.nativeElement.querySelectorAll('button');
    this.buttons[0].classList.add('active');
  }

  constructor(private el: ElementRef,
              public dataService: DataService,
              public i18n:I18nService) {
  }

  headChoice(choice: string) {
    this.buttons.forEach(el => (el.dataset.tab == choice) ? el.classList.add('active') : el.classList.remove('active'));
    this.tabContents.forEach(el => (el.dataset.tab == choice) ? el.classList.add('active') : el.classList.remove('active'));
  }
}
