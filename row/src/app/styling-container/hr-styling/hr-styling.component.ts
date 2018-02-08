import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "../../services/store";
import {Subscription} from "rxjs/Subscription";
import {OptionsService} from "../../services/options.service";
import {Line} from "../../data/Line";

@Component({
  selector: 'card-hr-styling',
  templateUrl: './hr-styling.component.html',
  styleUrls: ['./hr-styling.component.css']
})
export class HrStylingComponent implements OnInit, OnDestroy {

  private subscription: Subscription = null;
  lines: Line[] = [];

  constructor(public options: OptionsService,
              private store: Store) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.lines = cardData.lines.filter(l => l.isSelected));
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = null;
  }

  updateHr(param: string, res: any) {
    if (param == 'design')
      this.lines.forEach(line => line.design = res);
    else if (param == 'thickness')
      this.lines.forEach(line => line.thickness = res);
    else if (param == 'color')
      this.lines.forEach(line => line.color = res);
  }

  changeOrientation() {
    this.lines.forEach(line => line.changeOrientation());
  }
}

