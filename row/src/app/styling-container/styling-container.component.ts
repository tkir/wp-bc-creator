import {Component} from '@angular/core';
import {TabService} from "../services/tab.service";

@Component({
  selector: 'card-styling-container',
  templateUrl: './styling-container.component.html',
  styleUrls: ['./styling-container.component.css']
})
export class StylingContainerComponent {

  constructor(public tabService: TabService) {
  }

}
