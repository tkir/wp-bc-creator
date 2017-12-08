import {Injectable} from '@angular/core';
import {DataService} from "./data.service";
import {Store} from "./store";
import {CardData} from "../data/CardData";
import {Subscription} from "rxjs/Subscription";
import {UndoRedoService} from "./undo-redo.service";

@Injectable()
export class ItemService {

  private model: CardData = null;
  private subscription: Subscription;

  constructor(private dataService: DataService,
              private store: Store,
              private undoRedoService:UndoRedoService) {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.model = cardData);
  }

  public removeItem(item) {
    this.model.removeItem(item);
    this.dataService.updateCard(this.model);

    this.undoRedoService.removeItem(item);
  }

  public addTextField() {
    let item = this.model.addTextField();
    this.dataService.updateCard(this.model);

    this.undoRedoService.addItem(item);
  }

  public addLogo(src: string, width: number, height: number) {
    let item = this.model.addLogo(src, width, height);
    this.dataService.updateCard(this.model);

    this.undoRedoService.addItem(item);
  }

  public addHr() {
    let item = this.model.addHr();
    this.dataService.updateCard(this.model);

    this.undoRedoService.addItem(item);
  }

  public addIcon(unicode: string, x: number, y: number) {
    let item = this.model.addIcon(unicode, x, y);
    this.dataService.updateCard(this.model);

    this.undoRedoService.addItem(item);
  }

}
