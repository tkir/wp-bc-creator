import {Injectable} from '@angular/core';
import {AppConfigService} from "./app-config.service";
import {DbService} from "./db.service";

@Injectable()
export class FieldsDataService {

  constructor(private config: AppConfigService,
              private db: DbService) {
    this.path = this.config.get('host.db.data');
  }

  private path: string;

  getFieldsData(fieldData: string = 'default') {
    return this.db.get(`${this.path}/${fieldData}`);
  }

}
