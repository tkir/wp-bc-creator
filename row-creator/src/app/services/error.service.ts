import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ErrorService {

  constructor() {
  }

  public errorEvent: EventEmitter<any> = new EventEmitter();

  private _error: any = null;
  public set error(err) {
    this._error = err;
    this.errorEvent.emit(this._error);
  }
  public get error():any{
    return this._error;
  }

}
