import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class StylingService {

  constructor() {
  }

  private items: any[] = [];
  public selectedFieldsChanges: EventEmitter<any[]> = new EventEmitter();

  public add(item: any) {
    if (this.items.indexOf(item) !== -1) return;

    item.isSelected = true;
    this.items.push(item);
    this.selectedFieldsChanges.emit(this.items);
  }

  public remove(item: any) {
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

}
