import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {CardData} from "../data/CardData";

@Injectable()
export class OrderService {

  public card: { front: CardData, back: CardData } = null;

  constructor(private api: ApiService) {
  }

  orderCard(options, price, cost) {
    return this.api.post('/order',
      {
        price: price,
        value: cost,
        options: options,
        card: {front: this.card.front.json, back: this.card.back.json}
      });
  }
}
