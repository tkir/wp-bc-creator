import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";

@Component({
  selector: 'card-side-switch',
  templateUrl: './side-switch.component.html',
  styleUrls: ['./side-switch.component.css']
})
export class SideSwitchComponent {

  constructor(private dataService:DataService) { }

  changeSide(side){
    this.dataService.changeSide(side);
  }
}
