import {Injectable} from '@angular/core';

@Injectable()
export class TabService {

  constructor() {
  }

  private _editorTabIndex: number = 0;
  public get editorTabIndex(): number {
    return this._editorTabIndex;
  }
  public set editorTabIndex(val) {
    this._editorTabIndex = val;

    switch (val) {
      case 0:
        this._selectedField = 'Text';
        break;
      case 1:
        this._selectedField = 'Logo';
        break;
      case 2:
        this._selectedField = 'Line';
        break;
      case 3:
        this._selectedField = 'Icon';
        break;
      default:
        this._selectedField = 'Text';
    }
  }

  private _selectedField: string = 'Text';
  public get selectedField(): string {
    return this._selectedField;
  }
  public set selectedField(val: string) {
    this._selectedField = val;

    switch (val) {
      case 'Text':
        this._editorTabIndex = 0;
        break;
      case 'Logo':
        this._editorTabIndex = 1;
        break;
      case 'Line':
        this._editorTabIndex = 2;
        break;
      case 'Icon':
        this._editorTabIndex = 3;
        break;
      default:
        this._editorTabIndex = 0;
    }
  }
}
