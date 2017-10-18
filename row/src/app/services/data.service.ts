import {Injectable} from '@angular/core';
import {CardData} from "../data/CardData";
import {Store} from "./store";
import {NavigationStart, Router} from "@angular/router";
import {DesignService} from "./design.service";
import {CardService} from "./card.service";
import {OptionsService} from "./options.service";

@Injectable()
export class DataService {

  constructor(private options: OptionsService,
              private cardService: CardService,
              private store: Store,
              private router: Router,
              private designService: DesignService) {

    //вариант с router events
    router.events.subscribe((val: any) => {
      if (NavigationStart.prototype.isPrototypeOf(val)) {

        let url: string = val.url[0] == '/' ? val.url.slice(1) : val.url;
        let side: string = '';
        let arr:string[] = url.split('/');
        switch (arr.length){
          case 0:
            url = this.options.defaultDesign;
            side = 'front';
            break;
          case 1:
            side = 'front';
            break;
          case 2:
            url = arr[0];
            side = arr[1];
            side = (side.match(/^front|back$/i)) ? side : 'front';
            break;
          default:
            url = this.options.defaultDesign;
            side = 'front';
        }

        if (this.options.Designs.indexOf(url) !== -1) {
          this.designService.getDesign(url)
            .subscribe(d => {
              d['DesignData'] = JSON.parse(d['DesignData']);
              d['FieldsData'] = JSON.parse(d['FieldsData']);
              this.setCardData(d['FieldsData'], d['DesignData'], d['isEditable'], d['Slug']);
            });
        }
        //если роут неизвестен - грузим pageNotFound
        else {
          this.router.navigate(['/pageNotFound/front']);
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

  public setCardData(fieldsData, design, isEditable, slug) {
    this.cardService.keepLoadedCard(fieldsData, design, isEditable, slug);
    this.cardService.keepUserCard(fieldsData, design, isEditable, slug);

    this.cData = this.cardService.outFront;
    this.isDesignLoad = true;
    this.updateCard(this.cData);
  }
}
