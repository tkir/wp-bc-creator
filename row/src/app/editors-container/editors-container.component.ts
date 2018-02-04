import {Component} from '@angular/core';
import {GraphicService} from "../services/graphic.service";

@Component({
  selector: 'card-editors-container',
  templateUrl: './editors-container.component.html',
  styleUrls: ['./editors-container.component.css', '../css/tabs.css']
})
export class EditorsContainerComponent {

  constructor(public graphicService: GraphicService) {
  }

  changeTab(tab) {
    this.graphicService.activeTab = tab;
  }

}
