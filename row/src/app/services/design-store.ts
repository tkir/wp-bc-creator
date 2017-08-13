import 'rxjs/Rx';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Injectable} from "@angular/core";

export interface DesignState {
  data: string[]
}

const defaultState: DesignState = {
  data: []
};

const _store = new BehaviorSubject<DesignState>(defaultState);

@Injectable()
export class DesignStore {
  private store = _store;
  private _changes = this.store.asObservable();

  set state(state: DesignState) {
    this.store.next(state);
  }

  get state(): DesignState {
    return this.store.value;
  }

  get changes() {
    return this._changes;
  }

  purge() {
    this.store.next(defaultState);
  }
}
