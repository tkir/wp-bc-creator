import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {TextField} from "../../data/TextField";
import {AlignService} from "../../services/align.service";
import {OptionsService} from "../../services/options.service";
import {TextFieldService} from "../../services/text-field.service";
let WebFont = require('webfontloader');

@Component({
  selector: 'card-text-style',
  templateUrl: './text-style.component.html',
  styleUrls: ['./text-style.component.css'],
  host: {
    '(mousedown)': 'onMouseDown()'
  }
})
export class TextStyleComponent implements OnInit, OnDestroy {

  allowedFonts: string[] = [];
  items: TextField[] = [];
  private subscription: Subscription;

  constructor(private options: OptionsService,
              public textFieldService: TextFieldService,
              public alService: AlignService) {
  }

  ngOnInit() {
    this.allowedFonts = this.options.settings.allowedFonts;
    this.subscription = this.textFieldService.selectedFieldsChanges.subscribe(items => this.items = items);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onMouseDown() {
    this.items.forEach(item => item.isStyling = true);
  }

  endStyling() {
    this.items.forEach(item => item.isStyling = false);
  }

  toggleStyle(style: string) {

    switch (style) {
      case 'fontWeight':
        this.items.forEach(item =>
          item.fontWeight = (item.fontWeight === 'normal') ? 'bold' : 'normal');
        break;
      case 'fontStyle':
        this.items.forEach(item =>
          item.fontStyle = (item.fontStyle === 'normal') ? 'italic' : 'normal');
        break;
      case 'textDecoration':
        this.items.forEach(item =>
          item.textDecoration = (item.textDecoration === 'none') ? 'underline' : 'none');
        break;
    }

    this.endStyling();
  }

  setColor(color: string) {
    this.items.forEach(item => item.colorStr = color);

    this.endStyling();
  }

  setAlignment(alLine: string) {
    this.alService.alignTextFields(alLine);
  }

  setFontSize(direction: string) {
    this.items.forEach(item => item.changeFontSize(direction));
    this.endStyling();
  }

  setFontName(font: string) {

    WebFont.load({
      google: {
        families: [font]
      },
      active: (function () {
        this.items.forEach(item => item.fontName = font);
      }).bind(this)
    });

    this.endStyling();
  }

  // private endStyling() {
  //   this.returnFocus.emit();
  //   if (this.item) this.item.isStyling = false;
  // }
}
