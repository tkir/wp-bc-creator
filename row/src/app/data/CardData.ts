import {Logo} from "./Logo";
import {Background} from "./Background";
import {TextField} from "./TextField";
import {Line} from "./Line";
import {CardDesignData, CardFieldsData} from "./interfaces";

export class CardData {
  constructor(public owners: TextField[],
              public positions: TextField[],
              public organisations: TextField[],
              public addresses: TextField[],
              public phones: TextField[],
              public emails: TextField[],
              public sites: TextField[],
              public logos: Logo[],
              public lines: Line[],
              public background: Background,
              public isEditable: boolean) {
    this.update();
  }

  public fields = [];
  private config;

  public update() {
    this.fields = [];
    Object.keys(this).forEach(key => {
      if (key != 'fields' && key != 'config' && key != 'isEditable') {
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
        owners: this.owners.map(txt => txt.text),
        positions: this.positions.map(txt => txt.text),
        organisations: this.organisations.map(txt => txt.text),
        addresses: this.addresses.map(txt => txt.text),
        phones: this.phones.map(txt => txt.text),
        emails: this.emails.map(txt => txt.text),
        sites: this.sites.map(txt => txt.text),
        logos: this.logos.map(logo => logo.src)
      }
    );
  }

  public get designData(): CardDesignData {
    return new CardDesignData(
      {
        owners: this.owners.map(txt => txt.designData),
        positions: this.positions.map(txt => txt.designData),
        organisations: this.organisations.map(txt => txt.designData),
        addresses: this.addresses.map(txt => txt.designData),
        phones: this.phones.map(txt => txt.designData),
        emails: this.emails.map(txt => txt.designData),
        sites: this.sites.map(txt => txt.designData),
        logos: this.logos.map(logo => logo.designData),
        lines: this.lines.map(line => line.designData),
        background: this.background.designData
      });
  }
}


