import {Component, OnInit} from '@angular/core';
import {UpdateService} from '../services/update.service';
import {OptionsService} from '../services/options.service';

@Component({
  selector: 'menu-tab-order-detail',
  templateUrl: './tab-order-detail.component.html',
  styleUrls: ['./tab-order-detail.component.css']
})
export class TabOrderDetailComponent implements OnInit {

  public model;

  constructor(public options: OptionsService,
              private updateService: UpdateService) {
  }

  ngOnInit() {
    this.model = JSON.parse(JSON.stringify(this.options.OrderOptions));
  }

  public orderOptionsUpdate() {
  }

  public updatePrice(price) {
    if (this.options.price != +price) {
      this.updateService.updatePrice(price)
        .subscribe(p => this.options.price = p);
    }
  }

}
