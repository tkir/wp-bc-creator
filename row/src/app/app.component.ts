import {Component} from '@angular/core';
import {DataService} from "./services/data.service";
import {I18nService} from "./services/i18n.service";

@Component({
  selector: 'business-card-editor',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './css/tabs.css']
})
export class AppComponent {

  constructor(public dataService: DataService,
              public i18n:I18nService) {
  }

  headChoice(choice: string) {
  }
}
