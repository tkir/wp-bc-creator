import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {Store} from "../../services/store";
import {OptionsService} from "../../services/options.service";

@Component({
  selector: 'card-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  rows: any[] = [];
  cols: any[] = [];
  size = {
    'width.px': 0,
    'height.px': 0
  };
  outline = {
    'outline-width.px': 0,
    'outline-offset.px': 0
  };

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => {

        this.rows = new Array(Math.ceil(cardData.background.height_mm / this.options.settings.gridCellSize));
        this.cols = new Array(Math.ceil(cardData.background.width_mm / this.options.settings.gridCellSize));

        this.size['width.px'] = this.size['height.px'] = this.options.settings.ratio * this.options.settings.gridCellSize;
        this.outline['outline-width.px'] = cardData.background.indent;
        this.outline['outline-offset.px'] = - this.outline['outline-width.px'];
      });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  constructor(private store: Store,
              private options: OptionsService) {
  }

}
