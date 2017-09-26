import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable()
export class OrderService {

  public cardHtml:{} = null;

  constructor(private api:ApiService) { }

  orderCard(options, price, cost){
    return this.api.post('/order', {price:price, value:cost, options:options, card:this.cardHtml});
  }
}
