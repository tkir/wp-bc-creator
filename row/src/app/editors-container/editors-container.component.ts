import {Component} from '@angular/core';
import {TabService} from "../services/tab.service";
import {I18nService} from "../services/i18n.service";

@Component({
  selector: 'card-editors-container',
  templateUrl: './editors-container.component.html',
  styleUrls: ['./editors-container.component.css']
})
export class EditorsContainerComponent {

  constructor(public tabService: TabService,
              public i18n: I18nService) {
  }



}
