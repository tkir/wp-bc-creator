import {Component, OnDestroy, OnInit} from '@angular/core';
import {UpdateService} from '../services/update.service';
import {OptionsService} from '../services/options.service';
import {Subscription} from 'rxjs/Subscription';
import {bootstrapItem} from "@angular/cli/lib/ast-tools";
import {isBoolean} from "util";

@Component({
  selector: 'menu-tab-order-detail',
  templateUrl: './tab-order-detail.component.html',
  styleUrls: ['./tab-order-detail.component.css']
})
export class TabOrderDetailComponent implements OnInit, OnDestroy {

  public model;
  public modelPrice: number;
  private subs: Subscription[] = [];

  constructor(public options: OptionsService,
              private updateService: UpdateService) {
  }

  ngOnInit() {
    this.model = JSON.parse(JSON.stringify(this.options.OrderOptions));
    this.modelPrice = this.options.price;
  }

  ngOnDestroy() {
    if (this.subs.length) {
      this.subs.forEach(s => s.unsubscribe());
      this.subs = [];
    }
  }


  public deleteOption(option) {
    this.model.splice(this.model.indexOf(option), 1);
  }

  public deleteValue(option, val) {
    option.Values.splice(option.Values.indexOf(val), 1);
  }

  public addValue(option, val) {
    option.Values.push(val);
    option.Values.sort((a, b) => a.Rate - b.Rate);
  }

  public addOption() {
    this.model.push({id: -1, Name: '', Values: []});
  }

  public updatePrice(price) {
    if (this.options.price != +price) {
      this.subs.push(this.updateService.updatePrice(price)
        .subscribe(p => this.options.price = +p));
    }
  }

  public updateOrderOptions() {
    if (this.isFormValid)
      this.subs.push(this.updateService.updateOrderOptions(this.model)
        .subscribe(opt => {
          this.options.setOrderOptions(opt);
          this.ngOnInit();
        }));
  }

  public get isFormValid(): boolean {
    return (JSON.stringify(this.options.OrderOptions) != JSON.stringify(this.model)
      && this.model.every(o =>
        o.Name && o.Name.trim() !== ''
        && o.Values.length && o.Values.every(v =>
          v.Value && v.Value.trim() !== ''
          && v.Rate && v.Rate.trim() !== '' && +v.Rate !== 0 && v.Rate == +v.Rate
        )
      )
    );
  }
}
