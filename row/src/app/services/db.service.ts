import {Injectable} from '@angular/core';
import {AppConfigService} from "./app-config.service";
import {ApiService} from "./api.service";

@Injectable()
export class DbService {
  private dbURL: string;

  constructor(private config: AppConfigService,
              private api: ApiService) {
    this.dbURL = config.get('host.db.endpoint');
  }

  get(path) {
    return this.api.get(`${this.dbURL}${path}.json`)
  }

  post(path:string, data:any){
    return this.api.post(`${this.dbURL}${path}.json`, JSON.stringify(data));
  }

}
