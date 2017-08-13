import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AppConfigService} from "./app-config.service";
import {DbService} from "./db.service";
import {CardDesignData, CardFieldsData} from "../data/interfaces";
import {DesignStore} from "./design-store";
const objectHash = require('object-hash');

@Injectable()
export class DesignService {

  constructor(private config: AppConfigService,
              private db: DbService, private store:DesignStore) {
    this.path = this.config.get('host.db.design');
  }

  private path: string;

  getDesign(design: string):Observable<any> {
    return this.db.get(`${this.path}/${design}`);
  }

  saveDesign(fieldsData: CardFieldsData, designData: CardDesignData, preview: any) {
    let obj = {
      fieldsData: fieldsData,
      designData: designData
    };

    let cardHash = objectHash(obj);

    this.config.post('allowedDesigns', cardHash);
    this.updateDesigns(this.config.get('allowedDesigns'));
    // return this.db.post(
    //   `${this.path}/${this.config.get('hash')}/${cardHash}`, obj);
  }

  getAllowedDesigns(){
    this.updateDesigns(this.config.get('allowedDesigns'));

    return this.store.changes;
  }

  updateDesigns(state){
    let currentState = state;
    return this.store.state = currentState;
  }

}
