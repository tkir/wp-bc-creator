import {Component} from '@angular/core';
import {OptionsService} from "../services/options.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'card-side-switch',
  templateUrl: './side-switch.component.html',
  styleUrls: ['./side-switch.component.css', '../css/tabs.css']
})
export class SideSwitchComponent {

  constructor(public options: OptionsService,
              private dataService: DataService) {
  }

  setSideNum() {
    this.dataService.changeSideNumber((this.options.isDoubleSide) ? 'single' : 'double');
  }

}
