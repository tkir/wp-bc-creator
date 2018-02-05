export interface CardField {
  left: number;
  middle: number;
  right: number;
  top: number;
  positionLimits:{left:number, top:number, right:number, bottom:number};
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

  public texts: string[];
  public logos: string[];
  public icons: string[];
}

export class CardDesignData {
  constructor(obj) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
  }

  public texts: TextDesign[];
  public icons: IconDesign[];
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

export class IconDesign {
  constructor(public fontSize_mm: number,
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
