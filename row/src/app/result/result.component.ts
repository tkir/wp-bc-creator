import {Component, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {Store} from "../services/store";
import {CardData} from "../data/CardData";
import {AddResizeDirective} from "./directives/add-resize.directive";
import {DragObject} from "../services/drag-and-drop/drag.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'card-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  me = this;

  @ViewChildren(AddResizeDirective) addResizeDirectives: AddResizeDirective[];

  constructor(private store: Store,
              private dataService: DataService) {
  }

  cardData: CardData = null;
  dataArr = [];
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => {
        this.cardData = cardData;
        this.dataArr = cardData.fields;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  onDrop(event:DragObject){
    this.cardData.addIcon(event.data.unicode, event.left, event.top);
    this.dataService.updateCard(this.cardData);
  }
}
