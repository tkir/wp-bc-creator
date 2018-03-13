import {Component, OnInit} from '@angular/core';
import {TabService} from "../services/tab.service";
import {I18nService} from "../services/i18n.service";
import {StylingService} from "../services/styling.service";

@Component({
  selector: 'card-editors-container',
  templateUrl: './editors-container.component.html',
  styleUrls: ['./editors-container.component.css']
})
export class EditorsContainerComponent implements OnInit {

  selectedFields: any[] = [];

  constructor(private stylingService: StylingService,
              public i18n: I18nService) {
  }

  ngOnInit() {
    this.stylingService.selectedFieldsChanges.subscribe(fields => this.selectedFields = fields);
  }

}
