import {Logo} from "./Logo";
import {Background} from "./Background";
import {TextField} from "./TextField";
import {Line} from "./Line";
import {CardDesignData, CardFieldsData} from "./interfaces";

export class CardData {
  constructor(public texts: TextField[],
              public logos: Logo[],
              public lines: Line[],
              public background: Background,
              public options: { isEditable: boolean, isPristine: boolean, slug: string }) {
    this.update();
  }

  public fields = [];
  private config;

  public update() {
    this.fields = [];
    Object.keys(this).forEach(key => {
      if (key != 'fields' && key != 'config' && key != 'options') {
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
}


