import 'rxjs/Rx';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Injectable} from "@angular/core";

import {Logo} from "../data/Logo";
import {Background} from "../data/Background";
import {TextField} from "../data/TextField";
import {CardData} from "../data/CardData";

export interface Data {
  owners: TextField[],
  positions: TextField[],
  organisations: TextField[],
  addresses: TextField[],
  phones: TextField[],
  emails: TextField[],
  sites: TextField[],
  logos: Logo[],
  background: Background
}

export interface State {
  data: CardData;
}

const defaultState: State = {
  data: Object.create(CardData)
};

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
  private store = _store;
  private _changes = this.store.asObservable();

  set state(state: State) {
    this.store.next(state);
  }

  get state(): State {
    return this.store.value;
  }

  get changes() {
    return this._changes;
  }

  purge() {
    this.store.next(defaultState);
  }
}
