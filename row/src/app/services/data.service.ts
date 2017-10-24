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

        //если меняем сторону, то только перегружаем текущую карту
        if (this.isChanginSide) {
          this.updateCard((this.side == 'front') ? this.cardService.userFront : this.cardService.userBack);
          this.isChanginSide = false;
          return;
        }

        this.setSlug(val.url);

        if (this.options.Designs.indexOf(this.slug) !== -1) {
          this.designService.getDesign(this.slug)
            .subscribe(d => {
              this.setCardData(d);
              this.updateCard((this.side == 'front') ? this.cardService.userFront : this.cardService.userBack);
            });
        }
        //если роут неизвестен - грузим pageNotFound
        else {
          this.router.navigate(['/pageNotFound/front']);
        }
      }
    });
  }

  private setSlug(val): string {
    val = (val[0] == '/') ? val.slice(1) : val;

    let arr: string[] = val.split('/');
    switch (arr.length) {
      case 1:
        this.side = 'front';
        this.slug = arr[0];
        this.router.navigate([`/${(arr[0].length) ? arr[0] : this.options.defaultDesign}/front`]);
        return;
      case 2:
        this.slug = arr[0];
        this.side = arr[1];
        this.side = (this.side.match(/^front|back$/i)) ? this.side : 'front';
        return;
      default:
        this.slug = this.options.defaultDesign;
        this.side = 'front';
    }
    this.router.navigate([`/${this.options.defaultDesign}/front`]);
  }

  public isDesignLoad = false;
  public slug: string = '';
  private side: string = 'front';
  private isChanginSide: boolean = false;

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
  }

  //button reset data to default
  public resetData() {
    this.cardService.resetData();
    this.updateCard((this.side == 'front') ? this.cardService.userFront : this.cardService.userBack);
  }

  public changeSide(side) {
    if (this.side == side)return;

    this.side = side;
    this.isChanginSide = true;
    this.router.navigate([`/${this.slug}/${this.side}`]);

  }
}
