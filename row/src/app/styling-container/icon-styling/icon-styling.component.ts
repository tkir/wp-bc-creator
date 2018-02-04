import {Component, OnInit} from '@angular/core';

import {AlignService} from "../../services/align.service";
import {StylingService} from "../../services/styling.service";
import {UndoRedoService} from "../../services/undo-redo.service";

@Component({
  selector: 'card-icon-styling',
  templateUrl: './icon-styling.component.html',
  styleUrls: ['./icon-styling.component.css'],
  host: {
    '(mousedown)': 'onMouseDown()'
  }
})
export class IconStylingComponent implements OnInit {

  items: any[] = [];

  public isTextStyling = false;
  public isIconStyling = false;

  constructor(public stylingService: StylingService,
              public alService: AlignService,
              private undoRedoService: UndoRedoService) {
  }

  ngOnInit() {
    this.stylingService.selectedFieldsChanges.subscribe(items => {
      this.items = items;
      this.isTextStyling = this.items.some(it => it.instanceOf == 'Text');
      this.isIconStyling = this.items.some(it => it.instanceOf == 'Icon');
    });
  }

  onMouseDown() {
    this.items.forEach(item => item.isStyling = true);
    this.undoRedoService.setSelectionArray(this.items);
  }

  endStyling() {
    this.items.forEach(item => item.isStyling = false);
  }

  setColor(color: string) {
    this.items.forEach(item => item.colorStr = color);

    this.endStyling();
  }

  setFontSize(direction: string) {
    this.items.forEach(item => item.changeFontSize(direction));
    this.endStyling();
  }
}
