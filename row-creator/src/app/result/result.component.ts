import {Component, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {Subscription} from "rxjs/Subscription";

import {Store} from "../services/store";
import {CardData} from "../data/CardData";
import {AddResizeDirective} from "./directives/add-resize.directive";
import {DragObject} from "../services/drag-and-drop/drag.service";
import {ItemService} from "../services/item.service";
import {OptionsService} from "../services/options.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'card-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  animations:[
    trigger('sideTrigger', [
      state('front', style({transform: 'rotateX(0deg)'})),
      state('back', style({transform: 'rotateX(360deg)'})),
      transition('front <=> back', animate('0.5s'))
    ])
  ]
})
export class ResultComponent implements OnInit, OnDestroy {

  me = this;

  @ViewChildren(AddResizeDirective) addResizeDirectives: AddResizeDirective[];

  constructor(private store: Store,
              private itemService: ItemService,
              public dataService:DataService,
              public options: OptionsService) {
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

  onDrop(event: DragObject) {
    this.itemService.addIcon(event.data.unicode, event.left, event.top);
  }
}
