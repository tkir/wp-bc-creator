import {Logo} from "./Logo";
import {Background} from "./Background";
import {TextField} from "./TextField";
import {Line} from "./Line";
import {CardDesignData, CardFieldsData} from "./interfaces";
import {OptionsService} from "../services/options.service";

export class CardData {
  constructor(public texts: TextField[],
              public logos: Logo[],
              public lines: Line[],
              public background: Background,
              public isEditable: boolean,
              public slug: string,
              private options: OptionsService) {
    this.update();
  }

  public fields = [];
  private config;

  public update() {
    this.fields = [];
    Object.keys(this).forEach(key => {
      if (key != 'fields' && key != 'config' && key != 'isEditable' && key != 'slug') {
        if (Array.isArray(this[key]))
          this.fields.push(...this[key]);
        else this.fields.push(this[key]);
      }
    });
    this.updateSize();
  }

  onChangeBgSize() {
    this.fields.forEach(field => {
      if (field.instanceOf == 'Text' || field.instanceOf == 'Logo' || field.instanceOf == 'Line')
        field.onChangeBgSize(this.background);
    })
  }

  private updateSize() {
    this.logos.forEach(logo => logo.setMax(this.background.width, this.background.height));
    this.options.cardWidth = this.background.width;
    this.options.cardHeight = this.background.height;
  }

  public get json() {
    let obj = {};

    this.fields.forEach(f => {
      if (!obj.hasOwnProperty(f.instanceOf))
        obj[f.instanceOf] = [];
      obj[f.instanceOf].push(f.json);
    });

    return obj;
  }

  public get fieldsData(): CardFieldsData {
    return new CardFieldsData(
      {
        texts: this.texts.map(txt => txt.text),
        logos: this.logos.map(logo => logo.src)
      }
    );
  }

  public get designData(): CardDesignData {
    return new CardDesignData(
      {
        texts: this.texts.map(txt => txt.designData),
        logos: this.logos.map(logo => logo.designData),
        lines: this.lines.map(line => line.designData),
        background: this.background.designData
      });
  }

  public addLogo(src: string, width: number, height: number) {
    this.logos.push(
      new Logo(
        src,
        {width: width, height: height, left_mm: 5, top_mm: 5},
        this.options
      )
    );
  }

  public addHr() {
    this.lines.push(
      new Line(
        {
          left_mm: 0,
          top_mm: 30,
          length_mm: 45,
          _thickness: 1,
          isHorizontal: true,
          design: 'solid',
          _color: '00f'
        },
        this.options
      )
    );
  }
}


