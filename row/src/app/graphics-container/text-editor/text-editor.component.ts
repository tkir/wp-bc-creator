import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {CardData} from "../../data/CardData";
import {Store} from "../../services/store";
import {ImageService} from "../../services/image.service";
import {StylingService} from "../../services/styling.service";
import {ItemService} from "../../services/item.service";
import {UndoRedoService} from "../../services/undo-redo.service";
import {TextField} from "../../data/TextField";


@Component({
  selector: 'card-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit, OnDestroy {

  model: CardData = null;
  selectedInput: any = null;
  private selectedItem:TextField=null;

  private subscription: Subscription;

  constructor(private store: Store,
              private imageService: ImageService,
              private stylingService: StylingService,
              private itemService: ItemService,
              private undoRedoService:UndoRedoService) {
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

    this.selectedItem=this.model.texts[i];
    this.undoRedoService.textChange(this.model.texts[i], this.model.texts[i].text, null);
  }

  blurItem() {
    this.selectedInput = null;

    this.undoRedoService.textChange(this.selectedItem, null, this.selectedItem.text);
  }

  onFocusReturn() {
    this.selectedInput.focus();
  }

  uploadImage(item, event) {
    if (event.target.files.length)
      this.imageService.uploadImage(item, event.target.files[0]);
  }
}
