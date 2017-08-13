import {Injectable} from '@angular/core';
import {CardData} from "../data/CardData";
import {Store} from "./store";
import {AppConfigService} from "./app-config.service";
import {NavigationStart, Router} from "@angular/router";
import {DesignService} from "./design.service";
import {FieldsDataService} from "./fields-data.service";
import {CardService} from "./card.service";

@Injectable()
export class DataService {

  constructor(private cardService: CardService,
              private store: Store,
              private config: AppConfigService,
              private router: Router,
              private designService: DesignService) {

    let designs = this.config.get('allowedDesigns');

    //вариант с router events
    router.events.subscribe((val: any) => {
      if (NavigationStart.prototype.isPrototypeOf(val)) {
        let url = val.url[0] == '/' ? val.url.slice(1) : val.url;
        if (url === '') url = 'default';
        if (designs.indexOf(url) !== -1) {
          this.designService.getDesign(url)
            .subscribe(d => {
              //проверка, есть ли какие-то данные в карте, если нет - загружаем default fieldsData
              if (this.isDesignLoad)
                this.setCardData(d.designData, this.cData.fieldsData);
              else
                this.setCardData(d.designData, d.fieldsData);
            });
        }
        //если роут неизвестен - грузим базовый
        else {
          this.router.navigate(['/']);
        }
      }
    });
  }

  private cData: CardData;
  public isDesignLoad = false;

  updateCard(state): CardData {
    state.update();
    let currentState = state;
    return this.store.state = currentState;
  }

  public setCardData(design?, fieldsData?) {
    this.cData = this.cardService.getCard(fieldsData, design, this.config);
    this.isDesignLoad = true;
    this.updateCard(this.cData);
  }
}
