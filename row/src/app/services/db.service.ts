import {Injectable} from '@angular/core';
import {PlatformLocation} from "@angular/common";
import {Observable} from "rxjs/Observable";
import {AppConfigService} from "./app-config.service";
import {ApiService} from "./api.service";

@Injectable()
export class DbService {
  private dbURL: string;
  private cardBase: Observable<any> = null;

  constructor(private config: AppConfigService,
              private api: ApiService,
              private location: PlatformLocation) {
    //TODO php из базы данных
    this.dbURL = `${this.location.getBaseHrefFromDOM()}assets/db-card.json`;
  }

  get(name: string) {
    if (!this.cardBase) {
      this.cardBase = this.api.get(this.dbURL);
    }

    return this.cardBase
      .map(des => des.name == name);
  }

  post(path: string, data: any) {
    return this.api.post(`${this.dbURL}${path}.json`, JSON.stringify(data));
  }

}
