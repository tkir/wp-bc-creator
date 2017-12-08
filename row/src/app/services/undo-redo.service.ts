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

  public removeItem(item) {
    item.isSelected = false;
    this.undoArr.push({type: 'remove', item: item});
  }

  public addItem(item) {
    this.undoArr.push({type:'add', item:item});
  }

  public textChange(item, prev: string, curr: string) {

  }

  public itemPositionChange(item, prev, curr) {

  }

  public itemSizeChange(item, prev, curr) {

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
    }

    this.redoArr.push(state);
    this.dataService.updateCard(this.model);
  }

}
