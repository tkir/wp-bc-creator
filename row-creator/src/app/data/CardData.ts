import {Logo} from "./Logo";
import {Background} from "./Background";
import {TextField} from "./TextField";
import {Line} from "./Line";
import {CardDesignData, CardFieldsData} from "./interfaces";
import {OptionsService} from "../services/options.service";
import {Icon} from "./IconField";

export class CardData {
  constructor(public texts: TextField[],
              public logos: Logo[],
              public lines: Line[],
              public icons: Icon[],
              public background: Background,
              public isEditable: boolean,
              public slug: string,
              private options: OptionsService) {
    this.update();
  }

  public fields = [];

  public update() {
    this.fields = [];
    Object.keys(this).forEach(key => {
      if (key != 'fields' && key != 'isEditable' && key != 'slug' && key != 'options') {
        if (Array.isArray(this[key]))
          this.fields.push(...this[key]);
        else this.fields.push(this[key]);
      }
    });
    this.updateSize();
  }

  onChangeBgSize() {
    this.fields.forEach(field => {
      if (field.instanceOf == 'Text' || field.instanceOf == 'Logo' || field.instanceOf == 'Line' || field.instanceOf == 'Icon')
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
        icons: this.icons.map(icon => icon.unicode),
        logos: this.logos.map(logo => logo.src)
      }
    );
  }

  public get designData(): CardDesignData {
    return new CardDesignData(
      {
        texts: this.texts.map(txt => txt.designData),
        icons: this.icons.map(icon => icon.designData),
        logos: this.logos.map(logo => logo.designData),
        lines: this.lines.map(line => line.designData),
        background: this.background.designData
      });
  }

  public addItem(item){
    switch (item.instanceOf){
      case 'Text':
        this.texts.push(item);
        break;
      case 'Icon':
        this.icons.push(item);
        break;
      case 'Logo':
        this.logos.push(item);
        break;
      case 'Line':
        this.lines.push(item);
        break;
    }

    this.update();

    return item;
  }

  public addLogo(src: string, width: number, height: number) {
    let logo=new Logo(
      src,
      {width: width, height: height, left_mm: 5, top_mm: 5},
      this.options
    );

    this.logos.push(logo);
    this.update();

    return logo;
  }

  public addHr() {
    let line=new Line(
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
    );
    this.lines.push(line);
    this.update();

    return line;
  }

  public addIcon(unicode: string, x: number, y: number) {
    let icon = new Icon(unicode, {}, this.options);
    icon.left = x;
    icon.top = y;

    this.icons.push(icon);
    this.update();

    return icon;
  }

  public addTextField(){
    let textField=new TextField(
      'new text',
      {
        fontFamily: this.options.settings.allowedFonts[0],
        fontSize_mm: 4,
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        colorStr: '000',
        left_mm: 30,
        top_mm: 5
      },
      this.options
    );

    this.texts.push(textField);
    this.update();

    return textField;
  }

  public removeItem(item: any) {
    let i: number;
    switch (item.instanceOf) {
      case 'Text':
        i = this.texts.findIndex(i => i == item);
        if (i !== -1) this.texts.splice(i, 1);
        break;
      case 'Icon':
        i = this.icons.findIndex(i => i == item);
        if (i !== -1) this.icons.splice(i, 1);
        break;
      case 'Logo':
        i = this.logos.findIndex(i => i == item);
        if (i !== -1) this.logos.splice(i, 1);
        break;
      case 'Line':
        i = this.lines.findIndex(i => i == item);
        if (i !== -1) this.lines.splice(i, 1);
        break;
    }

    this.update();
  }
}


