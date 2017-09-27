import {Injectable} from '@angular/core';
import {CardData} from "../data/CardData";
import {CardDesignData, CardFieldsData, TextDesign} from "../data/interfaces"
import {Logo} from "../data/Logo";
import {Line} from "../data/Line";
import {Background} from "../data/Background";
import {TextField} from "../data/TextField";
import {OptionsService} from "./options.service";
let WebFont = require('webfontloader');

@Injectable()
export class CardService {

  constructor(private options:OptionsService){}

  public getCard(fData: CardFieldsData, dData: CardDesignData, isEditable:boolean): CardData {

    let owners: TextField[] = this.createText(fData['owners'], dData['owners']);
    let positions: TextField[] = this.createText(fData.positions, dData.positions);
    let organisations: TextField[] = this.createText(fData.organisations, dData.organisations);
    let addresses: TextField[] = this.createText(fData.addresses, dData.addresses);
    let phones: TextField[] = this.createText(fData.phones, dData.phones);
    let emails: TextField[] = this.createText(fData.emails, dData.emails);
    let sites: TextField[] = this.createText(fData.sites, dData.sites);

    let logos: Logo[] = dData.logos.map((d, i) => {
      if (fData.logos[i]) return new Logo(
        fData.logos[i], d, this.options);
    });

    let lines: Line[] = dData.lines.map((d, i) => new Line(d, this.options));

    let bg: Background = new Background(dData.background, this.options);

    //подгружаем уникальные шрифты
    this.loadedFonts = this.loadedFonts.filter(this.onlyUnique);
    this.loadedFonts.forEach(font =>
      WebFont.load({
        google: {
          families: [font]
        }
      }));

    return new CardData(owners, positions, organisations, addresses, phones, emails, sites, logos, lines, bg, isEditable);
  }

  private createText(fStrs: string[], tDsns: TextDesign[]): TextField[] {

    let fonts = tDsns.map(d => d.fontFamily);
    this.loadedFonts.push(...fonts);

    return tDsns.map((d, i) => {
      if (fStrs[i])return new TextField(fStrs[i], d, this.options);
    });
  }

  private onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  private loadedFonts: string[] = [];

}
