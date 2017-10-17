import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {CardData} from "../data/CardData";

@Injectable()
export class OrderService {

  public card: CardData = null;

  constructor(private api: ApiService) {
  }

  orderCard(options, price, cost) {
    return this.api.post('/order',
      {
        price: price,
        value: cost,
        options: options,
        FieldsData: this.card.fieldsData,
        DesignData: this.card.designData,
        card: this.card.json
      });
  }
}
