import {Injectable} from '@angular/core';

@Injectable()
export class AlignService {

  public fields: any[] = [];
  public isMultiselection = false;

  public alignTextFields(alLine: string) {
    if (this.isMultiselection) {
      switch (alLine) {
        case 'left':
          this.fields.forEach(f => f.left = this.fields[0].left);
          break;
        case 'middle':
          this.fields.forEach(f => f.middle = this.fields[0].middle);
          break;
        case 'right':
          this.fields.forEach(f => f.right = this.fields[0].right);
          break;
      }
    }
  }
}
