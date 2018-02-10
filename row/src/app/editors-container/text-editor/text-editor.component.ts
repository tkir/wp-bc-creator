import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {Store} from "../../services/store";
import {StylingService} from "../../services/styling.service";
import {ItemService} from "../../services/item.service";
import {UndoRedoService} from "../../services/undo-redo.service";
import {TextField} from "../../data/TextField";
import {I18nService} from "../../services/i18n.service";


@Component({
  selector: 'card-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit, OnDestroy {

  textFields: TextField[] = null;
  placeholders: string[] = [];
  private selectedItem: TextField = null;
  private subscription: Subscription;

  constructor(private store: Store,
              public i18n: I18nService,
              private stylingService: StylingService,
              private itemService: ItemService,
              private undoRedoService: UndoRedoService) {
  }

  ngOnInit() {
    this.placeholders = this.i18n.get("editor.text.placeholders");
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.textFields = cardData.texts)

  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  addTextField() {
    this.itemService.addTextField();
  }

  removeItem(field) {
    this.itemService.removeItem(field);
  }

  focusItem(field) {

    this.stylingService.clear();
    this.stylingService.add(field);

    this.selectedItem = field;
    this.undoRedoService.textChange(field, field.text, null);
  }

  blurItem() {
    this.undoRedoService.textChange(this.selectedItem, null, this.selectedItem.text);
  }
}
