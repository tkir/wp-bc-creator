import {Component} from '@angular/core';
import {DataService} from "./services/data.service";

@Component({
  selector: 'business-card-editor',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public dataService: DataService) {
  }

}
