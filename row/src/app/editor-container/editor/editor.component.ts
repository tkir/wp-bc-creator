import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {DataService} from "../../services/data.service";
import {CardData} from "../../data/CardData";
import {TextField} from "../../data/TextField";
import {Store} from "../../services/store";
import {ImageService} from "../../services/image.service";
import {OptionsService} from "../../services/options.service";
import {StylingService} from "../../services/styling.service";


@Component({
  selector: 'card-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  model: CardData = null;
  selectedInput: any = null;

  private subscription: Subscription;

  constructor(private options: OptionsService,
              private dataService: DataService,
              private store: Store,
              private imageService: ImageService,
              private stylingService: StylingService) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.model = cardData);
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  addTextField(i?: number) {

    let newText: TextField = new TextField('',
      {
        fontFamily: this.getItemFont(),
        fontSize_mm: 1.2,
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        colorStr: '000',
        left_mm: 30,
        top_mm: 5
      }, this.options);

    if (this.model.texts && this.model.texts.length) {
      Object.keys(this.model.texts[i]).forEach(key => newText[key] = this.model.texts[i][key]);
      newText.top += 20;
    }

    this.model.texts.splice(i + 1, 0, newText);
    this.dataService.updateCard(this.model);
  }

  private getItemFont(): string {
    let fontFamily;
    this.model.fields.forEach(item => {
      if (item.instanceOf == 'Text') fontFamily = item.fontFamily;
    });

    return fontFamily;
  }

  removeItem(items, i) {
    items.splice(i, 1);

    this.dataService.updateCard(this.model);
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
