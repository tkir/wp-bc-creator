import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AppConfigService} from "./app-config.service";
import {CardDesignData, CardFieldsData} from "../data/interfaces";
import {DesignStore} from "./design-store";
import {ApiService} from "./api.service";
const objectHash = require('object-hash');
declare const bc_creator_config: any;


@Injectable()
export class DesignService {

  constructor(private config: AppConfigService,
              private store: DesignStore,
              private api: ApiService) {
    this.path = `${bc_creator_config['path']}business-card-creator/design`;
  }

  private path: string;

  getDesign(design: string): Observable<any> {
    return this.api.get(`${this.path}/${design}`);
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

  getPreviews(){
    this.updateDesigns(bc_creator_config.previews);
    return this.store.changes;
  }

  updateDesigns(state) {
    let currentState = state;
    return this.store.state = currentState;
  }

}
