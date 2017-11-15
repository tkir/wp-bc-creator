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

  public loadedFront: CardData = null;
  public loadedBack: CardData = null;
  public userFront: CardData = null;
  public userBack: CardData = null;

  constructor(private options: OptionsService) {
  }

  private getCard(fData: CardFieldsData, dData: CardDesignData, isEditable: boolean, slug: string): CardData {

    let texts: TextField[] = this.createText(fData.texts, dData.texts);

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

    return new CardData(
      texts, logos, lines, bg,
      {isEditable: isEditable, slug: slug});
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

  public keepLoadedCard(fData: { front: CardFieldsData, back: CardFieldsData },
                        dData: { front: CardDesignData, back: CardDesignData },
                        isEditable: boolean, slug: string) {
    this.loadedFront = this.getCard(fData.front, dData.front, isEditable, slug);
    this.loadedBack = this.getCard(fData.back, dData.back, isEditable, slug);
  }

  public keepUserCard(fData: { front: CardFieldsData, back: CardFieldsData },
                      dData: { front: CardDesignData, back: CardDesignData },
                      isEditable: boolean, slug: string) {
    this.userFront = this.getCard(fData.front, dData.front, isEditable, slug);
    this.userBack = this.getCard(fData.back, dData.back, isEditable, slug);
  }

  public get isPristine() {
    return JSON.stringify(this.loadedFront.fieldsData) == JSON.stringify(this.userFront.fieldsData) &&
      JSON.stringify(this.loadedBack.fieldsData) == JSON.stringify(this.userBack.fieldsData);
  }

  public resetData() {

    this.userFront = this.getCard(
      this.loadedFront.fieldsData,
      this.loadedFront.designData,
      this.loadedFront.options.isEditable,
      this.loadedFront.options.slug);

    this.userBack = this.getCard(
      this.loadedBack.fieldsData,
      this.loadedBack.designData,
      this.loadedBack.options.isEditable,
      this.loadedBack.options.slug)
  }

  public get doubleSideCard() :{ front: CardData, back: CardData }{
    return {
      'front': this.userFront,
      'back': this.userBack
    }
  }

}
