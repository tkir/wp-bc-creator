import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {DesignStore} from "./design-store";
import {ApiService} from "./api.service";
import {CardData} from "../data/CardData";
import {OptionsService} from "./options.service";


@Injectable()
export class DesignService {

  constructor(private options: OptionsService,
              private store: DesignStore,
              private api: ApiService) {
  }

  getDesign(design: string): Observable<any> {
    return this.api.get(`/design/${design}`);
  }

  saveDesign(card: { front: CardData, back: CardData }) {
    return this.api.post('/save', {
      FieldsData: {front: card.front.fieldsData, back: card.back.fieldsData},
      DesignData: {front: card.front.designData, back: card.back.designData},
      card: {front: card.front.json, back: card.back.json},
      isDoubleSide: this.options.isDoubleSide
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

  deleteDesign(slug) {
    return this.api.delete(`/design/${slug}`);
  }

  //TODO удалить в продакшен
  adminSaveDesign(card: { front: CardData, back: CardData }) {
    return this.api.post('/adminSave', {
      FieldsData: {front: card.front.fieldsData, back: card.back.fieldsData},
      DesignData: {front: card.front.designData, back: card.back.designData},
      card: {front: card.front.json, back: card.back.json},
      isDoubleSide: this.options.isDoubleSide
    });
  }

}
