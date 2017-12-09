import {Injectable} from '@angular/core';
import {CardData} from "../data/CardData";
import {Subscription} from "rxjs/Subscription";
import {DataService} from "./data.service";
import {Store} from "./store";

@Injectable()
export class UndoRedoService {

  private model: CardData = null;
  private subscription: Subscription;

  constructor(private dataService: DataService,
              private store: Store) {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.model = cardData);
  }

  private undoArr: { type: string, item, prev? }[] = [];
  private redoArr: { type: string, item, prev? }[] = [];

  private prev: any;
  private selectionArray: { item: any, json: string }[] = [];

  public removeItem(item) {
    item.isSelected = false;
    this.undoArr.push({type: 'remove', item: item});
  }

  public addItem(item) {
    this.undoArr.push({type: 'add', item: item});
  }

  public textChange(item, prev: string, curr: string) {
    if (prev) {
      this.prev = prev;
      return;
    }

    if (curr != this.prev)
      this.undoArr.push({type: 'textChange', item: item, prev: this.prev});

    this.prev = null;
  }

  public setSelectionArray(items: any[]) {
    this.selectionArray = [];
    if (!items || !items.length) return;

    this.selectionArray = items.map(item => {
      return {item: item, json: JSON.stringify(item.json)};
    });
  }

  public itemsChange(items: any[]) {
    if (!items || !items.length || !this.selectionArray.length) {
      this.selectionArray = [];
      return;
    }

    let isSame = true;
    for (let i = 0; i < items.length; i++) {
      if (!isSame) break;

      this.selectionArray.forEach((selectedItem) => {
        if (items[i] == selectedItem.item)
        isSame = JSON.stringify(items[i].json) == selectedItem.json
      })
    }

    if (isSame) return;
    if (this.undoArr.length &&
      this.undoArr[this.undoArr.length - 1].type == 'itemsChange' &&
      this.undoArr[this.undoArr.length - 1].item == this.selectionArray)
      return;


    //добавляем только если произошли изменения размера или положения
    this.undoArr.push({type: 'itemsChange', item: this.selectionArray});
  }

  public undo() {
    if (!this.undoArr.length) return;

    let state = this.undoArr.pop();

    switch (state.type) {
      case 'remove':
        this.model.addItem(state.item);
        break;

      case 'add':
        this.model.removeItem(state.item);
        break;

      case 'textChange':
        if (state.item.instanceOf == 'Text') state.item.text = state.prev;
        break;

      case 'itemsChange':
        state.item.forEach((it) => {
          this.model.fields.forEach(field => {
            if (field == it.item) {
              field.json = JSON.parse(it.json);
            }
          })
        });
        this.selectionArray = [];
        break;
    }

    this.redoArr.push(state);
    this.dataService.updateCard(this.model);
  }
}
