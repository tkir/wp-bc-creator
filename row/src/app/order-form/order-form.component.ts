import {Component, ElementRef, OnInit} from '@angular/core';
import {OptionsService} from "../services/options.service";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'card-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  public model: [{ id: number, Name: string, Values: [{ Value: string, Rate: string, isSelected: boolean }] }];
  public price: number;
  public cost: number;
  public fastOrderCost: number;
  public fastOrderOptions: { optionName: string, Value: string, Rate: string }[];
  public selectedOptions: { optionName: string, Value: string, Rate: string }[];

  constructor(private elRef: ElementRef,
              private options: OptionsService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.model = JSON.parse(JSON.stringify(this.options.OrderOptions));
    this.price = this.options.price;

    this.selectedOptions = this.model.map(o => {
      return {
        optionName: o.Name,
        Value: o.Values.find(v => v.isSelected).Value,
        Rate: o.Values.find(v => v.isSelected).Rate
      };
    });

    this.updateCost();
    this.fastOrderCost = this.cost;
    this.fastOrderOptions = JSON.parse(JSON.stringify(this.selectedOptions));
  }

  private updateCost() {
    this.cost = this.price *
      this.selectedOptions
        .map(o => +o.Rate)
        .reduce((prev, curr) => prev * curr);

    this.cost = Math.round(this.cost * 100) / 100;
  }

  orderDetailClick() {
    this.elRef.nativeElement.querySelector('.order-form-container')
      .classList.toggle('active');
  }

  public onOptionSelected(val: { optionName: string, Value: string, Rate: string }) {

    let selected = this.selectedOptions.find(o => o.optionName == val.optionName);
    selected.Rate = val.Rate;
    selected.Value = val.Value;

    this.updateCost();
  }

  public order(isFast: boolean) {
    this.orderService.orderCard(
      isFast ? this.fastOrderOptions : this.selectedOptions,
      this.price,
      this.cost)
      .subscribe(resp => {
        if (resp.err) console.error(`Ordering error: ${resp.err}`);
        else console.log(`Order successful; ${resp.res}`);
      })
  }

}
