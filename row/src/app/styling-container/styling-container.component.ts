import {Component} from '@angular/core';
import {GraphicService} from "../services/graphic.service";

@Component({
  selector: 'card-styling-container',
  templateUrl: './styling-container.component.html',
  styleUrls: ['./styling-container.component.css']
})
export class StylingContainerComponent {

  constructor(public graphicService: GraphicService) {
  }

}
