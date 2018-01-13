import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {CardData} from "../../data/CardData";
import {Store} from "../../services/store";
import {OptionsService} from "../../services/options.service";
import {GridService} from "../../services/grid.service";

@Component({
  selector: 'card-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnDestroy {

  cardData: CardData = null;
  private subscription: Subscription;
  rows: any[] = [];
  cols: any[] = [];
  size = {
    'width.px': 0,
    'height.px': 0
  };

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => {
        this.cardData = cardData;

        this.rows = new Array(Math.ceil(cardData.background.height_mm / 3));
        this.cols = new Array(Math.ceil(cardData.background.width_mm / 3));
        this.size['width.px'] = this.size['height.px'] = this.options.settings.ratio * 3;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  constructor(private store: Store,
              private options: OptionsService,
              public gridService: GridService) {
  }

}
