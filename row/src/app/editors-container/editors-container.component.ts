import {Component} from '@angular/core';
import {TabService} from "../services/tab.service";

@Component({
  selector: 'card-editors-container',
  templateUrl: './editors-container.component.html',
  styleUrls: ['./editors-container.component.css', '../css/tabs.css']
})
export class EditorsContainerComponent {

  constructor(public tabService: TabService) {
  }

  changeTab(tab) {
    this.tabService.activeEditorTab = tab;
  }

}
