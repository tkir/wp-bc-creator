import {Component, OnDestroy, OnInit} from '@angular/core';
import {OptionsService} from "../services/options.service";
import {DataService} from "../services/data.service";
import {Store} from "../services/store";
import {Subscription} from "rxjs/Subscription";
import {Background} from "../data/Background";

@Component({
  selector: 'card-bg-size',
  templateUrl: './bg-size.component.html',
  styleUrls: ['./bg-size.component.css']
})
export class BgSizeComponent implements OnInit, OnDestroy {

  private subscription: Subscription = null;
  background: Background;
  orientation: string = 'landscape';
  cardData: any = null;

  constructor(public options: OptionsService,
              private store: Store,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => {
        this.cardData = cardData;
        this.background = cardData.background;
        if (this.background) {
          this.orientation = this.background.width_mm > this.background.height_mm ? 'landscape' : 'portrait';
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = null;
  }

  updateCardSize() {
    let tmp = this.background.width_mm;
    this.background.width_mm = this.background.height_mm;
    this.background.height_mm = tmp;

    this.cardData.onChangeBgSize();
    this.dataService.updateCard(this.cardData);
  }
}
