import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "../../services/store";
import {Subscription} from "rxjs/Subscription";
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

  constructor(private store: Store,
              private itemService: ItemService) {
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

  addHr() {
    this.itemService.addHr();
  }

  removeItem(hr) {
    this.itemService.removeItem(hr);
  }
}
