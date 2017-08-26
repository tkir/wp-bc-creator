import {Injectable} from '@angular/core';
import {DbService} from "./db.service1";

@Injectable()
export class FieldsDataService {

  constructor(
              private db: DbService) {
  }

  private path: string;

  getFieldsData(fieldData: string = 'default') {console.log('FieldsDataService:'+fieldData);
    return this.db.get(`${this.path}/${fieldData}`);
  }

}
