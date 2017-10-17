export interface CardField {
  left: number;
  top: number;
  isSelected: boolean;

  style: {};
  instanceOf: string;

  width: number;
  height: number;
}

export class CardFieldsData {
  constructor(obj) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
  }

  // public owners: string[];
  // public positions: string[];
  // public organisations: string[];
  // public addresses: string[];
  // public phones: string[];
  // public emails: string[];
  // public sites: string[];
  public texts: string[];
  public logos: string[];
}

export class CardDesignData {
  constructor(obj) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
  }

  // public owners: TextDesign[];
  // public positions: TextDesign[];
  // public organisations: TextDesign[];
  // public addresses: TextDesign[];
  // public phones: TextDesign[];
  // public emails: TextDesign[];
  // public sites: TextDesign[];
  public texts: TextDesign[];
  public logos: LogoDesign[];
  public lines: LineDesign[];
  public background: BgDesign;
}

export class TextDesign {
  constructor(public fontFamily: string,
              public fontSize_mm: number,
              public fontWeight: string,
              public fontStyle: string,
              public textDecoration: string,
              public colorStr: string,
              public left_mm: number,
              public top_mm: number) {
  }
}
export class LogoDesign {
  constructor(public width_mm: number,
              public height_mm: number,
              public left_mm: number,
              public top_mm: number) {
  }
}
export class LineDesign {
  constructor(public left_mm: number,
              public top_mm: number,
              public length_mm: number,
              public _thickness: number,
              public isHorizontal: boolean = true,
              public design: string = 'solid',
              public _color: string = '000') {
  }
}
export class BgDesign {
  constructor(public _backgroundColor: string,
              public src: string,
              public width_mm: number,
              public height_mm: number) {
  }
}
