import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "../../services/store";
import {Subscription} from "rxjs/Subscription";
import {OptionsService} from "../../services/options.service";
import {CardData} from "../../data/CardData";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'card-hr-editor',
  templateUrl: './hr-editor.component.html',
  styleUrls: ['./hr-editor.component.css']
})
export class HrEditorComponent implements OnInit, OnDestroy {

  private subscription: Subscription = null;
  model: CardData = null;
  allowedHrDesigns: string[] = [];

  constructor(private options: OptionsService,
              private store: Store,
              private itemService: ItemService) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.model = cardData);

    this.allowedHrDesigns = this.options.settings.allowedHrDesigns;
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

  addHr() {
    this.itemService.addHr();
  }

  removeItem(hr) {
    this.itemService.removeItem(hr);
  }
}
