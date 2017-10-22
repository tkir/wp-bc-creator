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
        let url = this.getUrl(val.url);

        if (this.options.Designs.indexOf(url) !== -1) {
          this.designService.getDesign(url)
            .subscribe(d => {
              this.setCardData(d);
            });
        }
        //если роут неизвестен - грузим pageNotFound
        else {
          this.router.navigate(['/pageNotFound/front']);
        }
      }
    });
  }

  private getUrl(val): string {
    let url: string = (val[0] == '/') ? val.slice(1) : val;
    if (url == '') {
      url = this.options.defaultDesign;
      this.side = 'front';
      return url;
    }
    let arr: string[] = url.split('/');
    switch (arr.length) {
      case 1:
        this.side = 'front';
        break;
      case 2:
        url = arr[0];
        this.side = arr[1];
        this.side = (this.side.match(/^front|back$/i)) ? this.side : 'front';
        break;
      default:
        url = this.options.defaultDesign;
        this.side = 'front';
    }

    return url;
  }

  public isDesignLoad = false;
  private side: string = 'front';

  updateCard(state): CardData {
    state.update();
    let currentState = state;
    return this.store.state = currentState;
  }

  public setCardData(d) {

    d['DesignData'] = JSON.parse(d['DesignData']);
    d['FieldsData'] = JSON.parse(d['FieldsData']);

    let fieldsData = d['FieldsData'];
    if (this.isDesignLoad && !this.cardService.isPristine) {
      fieldsData = (this.side == 'front') ?
        this.cardService.userFront.fieldsData :
        this.cardService.userBack.fieldsData;
    }

    this.cardService.keepLoadedCard(d['FieldsData'], d['DesignData'], d['isEditable'], d['Slug']);
    this.cardService.keepUserCard(fieldsData, d['DesignData'], d['isEditable'], d['Slug']);

    this.isDesignLoad = true;
    this.updateCard((this.side == 'front') ? this.cardService.userFront : this.cardService.userBack);
  }

  //button reset data to default
  public resetData() {
    this.cardService.resetData();
    this.updateCard((this.side == 'front') ? this.cardService.userFront : this.cardService.userBack);
  }
}
