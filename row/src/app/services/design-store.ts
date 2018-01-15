import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Injectable} from "@angular/core";

export class Preview {
  id: number;
  Name: string;
  Slug: string;
  Description: string;
  Preview: string;
  isActive: boolean;

  constructor(obj) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
  }
}

export interface DesignState {
  data: Preview[]
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
