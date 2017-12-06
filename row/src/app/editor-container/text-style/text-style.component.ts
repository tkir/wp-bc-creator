import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {AlignService} from "../../services/align.service";
import {OptionsService} from "../../services/options.service";
import {StylingService} from "../../services/styling.service";
import {ItemService} from "../../services/item.service";

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
  items: any[] = [];
  private subscription: Subscription;

  public isTextStyling = false;
  public isIconStyling = false;
  public textFont: string = '';

  constructor(private options: OptionsService,
              public stylingService: StylingService,
              public alService: AlignService,
              private itemService: ItemService) {
  }

  ngOnInit() {
    this.allowedFonts = this.options.settings.allowedFonts;
    this.textFont = this.allowedFonts[0];

    this.subscription = this.stylingService.selectedFieldsChanges.subscribe(items => {
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
        this.items.forEach(item => {
          if (item.instanceOf == 'Text') item.fontName = font;
          this.setTextField();
        });
      }).bind(this)
    });

    this.endStyling();
  }

  removeItems() {
    this.items.forEach(it => this.itemService.removeItem(it));
    this.items = [];
  }
}
