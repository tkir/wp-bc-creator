import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Line} from "../../data/Line";
import {Store} from "../../services/store";
import {Subscription} from "rxjs/Subscription";
import {OptionsService} from "../../services/options.service";
import {CardData} from "../../data/CardData";
import {DataService} from "../../services/data.service";

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
              private dataService: DataService) {
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
    this.model.addHr();
    this.dataService.updateCard(this.model);
  }

  removeItem(i) {
    this.model.lines.splice(i, 1);
    this.dataService.updateCard(this.model);
  }
}
