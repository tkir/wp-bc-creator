import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {TextField} from "../../data/TextField";
import {AlignService} from "../../services/align.service";
import {OptionsService} from "../../services/options.service";
let WebFont = require('webfontloader');

@Component({
  selector: 'card-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.css'],
  host: {
    '(mousedown)': 'onMouseDown()'
  }
})
export class StyleEditorComponent implements OnInit{

  @Input() item: TextField;
  @Output() returnFocus: EventEmitter<any> = new EventEmitter();
  allowedFonts: string[] = [];

  onMouseDown() {
    if (this.item) this.item.isStyling = true;
  }

  constructor(private options:OptionsService,
              public alService: AlignService) {
  }
  ngOnInit(){
    this.allowedFonts=this.options.settings.allowedFonts;
  }

  toggleStyle(style: string) {
    if (!this.item)return;

    switch (style) {
      case 'fontWeight':
        this.item.fontWeight = (this.item.fontWeight === 'normal') ?
          'bold' : 'normal';
        break;
      case 'fontStyle':
        this.item.fontStyle = (this.item.fontStyle === 'normal') ?
          'italic' : 'normal';
        break;
      case 'textDecoration':
        this.item.textDecoration = (this.item.textDecoration === 'none') ?
          'underline' : 'none';
        break;
    }

    this.endStyling();
  }

  private endStyling() {
    this.returnFocus.emit();
    if (this.item) this.item.isStyling = false;
  }

  setColor(color: string) {
    if (!this.item)return;

    this.item.colorStr = color;

    this.endStyling();
  }

  setAlignment(alLine: string) {
    this.alService.alignTextFields(alLine);
  }

  setFontSize(direction: string) {
    if (!this.item)return;

    this.item.changeFontSize(direction);
    this.endStyling();
  }

  setFontName(font: string) {

    WebFont.load({
      google: {
        families: [font]
      },
      active: (function () {
        this.item.fontName = font;
      }).bind(this)
    });

    this.endStyling();
  }
}
