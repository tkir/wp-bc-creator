import {Component, OnInit} from '@angular/core';

import {OptionsService} from "../../services/options.service";
import {StylingService} from "../../services/styling.service";
import {UndoRedoService} from "../../services/undo-redo.service";

let WebFont = require('webfontloader');

@Component({
  selector: 'card-font-styling',
  templateUrl: './font-styling.component.html',
  styleUrls: ['./font-styling.component.css'],
  host: {
    '(mousedown)': 'onMouseDown()'
  }
})
export class FontStylingComponent implements OnInit {

  allowedFonts: string[] = [];
  items: any[] = [];

  public isTextStyling = false;
  public isIconStyling = false;
  public textFont: string = '';

  constructor(private options: OptionsService,
              public stylingService: StylingService,
              private undoRedoService:UndoRedoService) {
  }

  ngOnInit() {
    this.allowedFonts = this.options.settings.allowedFonts;
    this.textFont = this.allowedFonts[0];

    this.stylingService.selectedFieldsChanges.subscribe(items => {
      this.items = items;
      this.isTextStyling = this.items.some(it => it.instanceOf == 'Text');
      this.isIconStyling = this.items.some(it => it.instanceOf == 'Icon');
      this.setTextField();
    });
  }

  private setTextField() {
    let textField = this.items.find(it => it.instanceOf == 'Text');
    this.textFont = (textField) ? textField.fontName : this.allowedFonts[0];
  }

  onMouseDown() {
    this.items.forEach(item => item.isStyling = true);
    this.undoRedoService.setSelectionArray(this.items);
  }

  endStyling() {
    this.items.forEach(item => item.isStyling = false);
  }

  toggleStyle(style: string) {

    switch (style) {
      case 'fontWeight':
        this.items.forEach(item => {
          if (item.instanceOf == 'Text') item.fontWeight = (item.fontWeight === 'normal') ? 'bold' : 'normal';
        });
        break;
      case 'fontStyle':
        this.items.forEach(item => {
          if (item.instanceOf == 'Text') item.fontStyle = (item.fontStyle === 'normal') ? 'italic' : 'normal';
        });
        break;
    }

    this.endStyling();
  }

  setFontName(font: string) {

    WebFont.load({
      google: {
        families: [font]
      },
      active: (function () {
        this.items.forEach(item => {
          if (item.instanceOf == 'Text') item.fontName = font;
          this.setTextField();
        });
      }).bind(this)
    });

    this.endStyling();
  }
}

