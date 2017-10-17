import {EventEmitter, Injectable} from '@angular/core';
import {TextField} from "../data/TextField";

@Injectable()
export class TextFieldService {
  private items: TextField[] = [];
  public selectedFieldsChanges: EventEmitter<TextField[]> = new EventEmitter();

  public add(item: TextField) {
    if (this.items.indexOf(item) !== -1) return;

    item.isSelected = true;
    this.items.push(item);
    this.selectedFieldsChanges.emit(this.items);
  }

  public remove(item: TextField) {
    if (this.items.indexOf(item) === -1)return;

    item.isSelected = false;
    this.items.splice(this.items.indexOf(item), 1);
    this.selectedFieldsChanges.emit(this.items);
  }

  public clear() {
    if (this.items == [])return;

    this.items.forEach(item => item.isSelected = false);
    this.items = [];
    this.selectedFieldsChanges.emit(this.items);
  }

  constructor() {
  }

}
