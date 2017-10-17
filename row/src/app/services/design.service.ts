import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {DesignStore} from "./design-store";
import {ApiService} from "./api.service";
import {CardData} from "../data/CardData";
import {OptionsService} from "./options.service";


@Injectable()
export class DesignService {

  constructor(private options:OptionsService,
              private store: DesignStore,
              private api: ApiService) {
  }

  getDesign(design: string): Observable<any> {
    return this.api.get(`/design/${design}`);
  }

  saveDesign(card: CardData) {
    return this.api.post('/save', {
      FieldsData: card.fieldsData,
      DesignData: card.designData,
      card: card.json
    });

  }

  getPreviews() {
    this.updateDesigns(this.options.previews);
    return this.store.changes;
  }

  updateDesigns(state) {
    let currentState = state;
    return this.store.state = currentState;
  }

  deleteDesign(slug){
    return this.api.delete(`/design/${slug}`);
  }

  //TODO удалить в продакшен
  adminSaveDesign(card:CardData){
    return this.api.post('/adminSave', {
      FieldsData: card.fieldsData,
      DesignData: card.designData,
      card: card.json
    });
  }

}
