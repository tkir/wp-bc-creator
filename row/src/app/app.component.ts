import {Component} from '@angular/core';
import {DataService} from "./services/data.service";
import {I18nService} from "./services/i18n.service";
import {GridService} from "./services/grid.service";

@Component({
  selector: 'business-card-editor',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dataService: DataService,
              public i18n: I18nService,
              public gridService: GridService) {
  }

  grid() {
    this.gridService.isGrid = !this.gridService.isGrid;
  }
}
