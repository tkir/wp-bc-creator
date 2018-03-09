import {Injectable} from '@angular/core';
import {CardData} from "../data/CardData";
import {Store} from "./store";
import {NavigationStart, Router} from "@angular/router";
import {DesignService} from "./design.service";
import {CardService} from "./card.service";
import {OptionsService} from "./options.service";
import {ErrorService} from "./error.service";

@Injectable()
export class DataService {

  constructor(private options: OptionsService,
              private cardService: CardService,
              private store: Store,
              private router: Router,
              private designService: DesignService,
              private errorService: ErrorService) {

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
              if (this.errorService.error) {
                this.errorService.error.message = this.options.errorMessage.loadDesign;
                return;
              }

              try {
                this.setCardData(d);
                this.updateCard((this.side == 'front') ? this.cardService.userFront : this.cardService.userBack);
              }
              catch (err) {
                err.message = this.options.errorMessage.loadDesign;
                this.errorService.error = err;
                return;
              }
            });
        }
        //если роут неизвестен - грузим pageNotFound
        else {
          this.router.navigate(['/pageNotFound/front']);
        }
      }
    });
  }

  private setSlug(val: string) {

    let arr: string[] =
      ~val.search(/&des=%2F.*/i) ? val.split('%2F') : val.split('/');

    let slug = (arr && arr[1]) ? arr[1] : this.options.defaultDesign;
    let side = (arr && arr[2] && ~arr[2].search(/^(front|back)$/i)) ? arr[2] : 'front';

    if (this.slug != slug || this.side != side) {
      this.slug = slug;
      this.side = side;
      this.router.navigate([`/${this.slug}/${this.side}`]);
    }
  }

  public isDesignLoad = false;
  public slug: string = '';
  public side: string = 'front';
  private isChanginSide: boolean = false;

  updateCard(state): CardData {
    let currentState = state;
    return this.store.state = currentState;
  }

  public setCardData(d) {

    d['DesignData'] = JSON.parse(d['DesignData']);
    d['FieldsData'] = JSON.parse(d['FieldsData']);

    let fieldsData = d['FieldsData'];

    this.cardService.keepLoadedCard(d['FieldsData'], d['DesignData'], d['isEditable'], d['Slug']);
    this.cardService.keepUserCard(fieldsData, d['DesignData'], d['isEditable'], d['Slug']);

    this.options.isDoubleSide = d['isDoubleSide'];

    this.isDesignLoad = true;
  }

  //button reset data to default
  public resetData() {
    this.cardService.resetData();
    this.updateCard((this.side == 'front') ? this.cardService.userFront : this.cardService.userBack);
  }

  public toggleSide(){
    this.side =(this.side=='front')?'back':'front';
    this.isChanginSide = true;
    this.router.navigate([`/${this.slug}/${this.side}`]);
  }

  public changeSideNumber(sideNum) {
    this.options.isDoubleSide = (sideNum == 'double');
    this.options.setOrderOptionsDefaultValues();
    if (this.side == 'back') this.toggleSide();
  }
}
