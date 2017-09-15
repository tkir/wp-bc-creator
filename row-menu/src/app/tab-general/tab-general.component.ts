import { Component } from '@angular/core';
import {OptionsService} from "../services/options.service";

@Component({
  selector: 'menu-tab-general',
  templateUrl: './tab-general.component.html',
  styleUrls: ['./tab-general.component.css']
})
export class TabGeneralComponent {

  constructor(public options:OptionsService) { }

  public onGeneralUpdate(){

  }

}
