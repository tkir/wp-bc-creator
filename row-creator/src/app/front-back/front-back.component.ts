import {Component} from '@angular/core';
import {OptionsService} from "../services/options.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'card-front-back',
  templateUrl: './front-back.component.html',
  styleUrls: ['./front-back.component.css', '../css/tabs.css']
})
export class FrontBackComponent {

  constructor(public options: OptionsService,
              public dataService: DataService) {
  }

  changeTab(event, side) {
    this.dataService.changeSide(side);
  }

}
