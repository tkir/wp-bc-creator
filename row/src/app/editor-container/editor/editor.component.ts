import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {CardData} from "../../data/CardData";
import {Store} from "../../services/store";
import {ImageService} from "../../services/image.service";
import {StylingService} from "../../services/styling.service";
import {ItemService} from "../../services/item.service";


@Component({
  selector: 'card-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  model: CardData = null;
  selectedInput: any = null;

  private subscription: Subscription;

  constructor(private store: Store,
              private imageService: ImageService,
              private stylingService: StylingService,
              private itemService: ItemService) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.model = cardData);
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  addTextField() {
    this.itemService.addTextField();
  }

  private getItemFont(): string {
    let fontFamily;
    this.model.fields.forEach(item => {
      if (item.instanceOf == 'Text') fontFamily = item.fontFamily;
    });

    return fontFamily;
  }

  removeItem(items, i) {
    this.itemService.removeItem(items[i]);
  }

  focusItem(event, i) {
    this.model.fields.forEach(item => {
      if (item.isSelected) item.isSelected = false;
    });

    this.selectedInput = event.target;


    this.stylingService.clear();
    this.stylingService.add(this.model.texts[i]);
  }

  blurItem() {
    this.selectedInput = null;
  }

  onFocusReturn() {
    this.selectedInput.focus();
  }

  uploadImage(item, event) {
    if (event.target.files.length)
      this.imageService.uploadImage(item, event.target.files[0]);
  }
}
