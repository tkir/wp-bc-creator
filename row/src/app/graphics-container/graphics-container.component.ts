import {Component} from '@angular/core';
import {GraphicService} from "../services/graphic.service";

@Component({
  selector: 'card-graphics-container',
  templateUrl: './graphics-container.component.html',
  styleUrls: ['./graphics-container.component.css', '../css/tabs.css']
})
export class GraphicsContainerComponent {

  constructor(public graphicService: GraphicService) {
  }

  changeTab(tab) {
    this.graphicService.activeTab = tab;
  }

}
