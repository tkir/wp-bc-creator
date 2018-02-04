import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "../../services/store";
import {Subscription} from "rxjs/Subscription";
import {OptionsService} from "../../services/options.service";
import {CardData} from "../../data/CardData";

@Component({
  selector: 'card-hr-styling',
  templateUrl: './hr-styling.component.html',
  styleUrls: ['./hr-styling.component.css']
})
export class HrStylingComponent implements OnInit, OnDestroy {

  private subscription: Subscription = null;
  model: CardData = null;

  constructor(public options: OptionsService,
              private store: Store) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.model = cardData);
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = null;
  }

  updateHr(hr, param: string, res: any) {
    if (param == 'design')
      hr.design = res;
    else if (param == 'thickness')
      hr.thickness = res;
    else if (param == 'color')
      hr._color = res;
  }

  changeOrientation(hr) {
    hr.isHorizontal = !hr.isHorizontal;
    hr.onChangeBgSize(this.model.background);
  }
}

