import {Component} from '@angular/core';
import {UpdateService} from '../services/update.service';
import {OptionsService} from '../services/options.service';

@Component({
  selector: 'menu-tab-order-detail',
  templateUrl: './tab-order-detail.component.html',
  styleUrls: ['./tab-order-detail.component.css']
})
export class TabOrderDetailComponent {

  constructor(public options: OptionsService,
              private updateService: UpdateService) {
  }

  public orderOptionsUpdate(){}

}
