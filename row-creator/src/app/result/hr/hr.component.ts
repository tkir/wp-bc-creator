import {Component, Input} from '@angular/core';
import {Line} from "../../data/Line";

@Component({
  selector: 'card-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent {

  @Input() line: Line = null;

}
