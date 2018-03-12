import {Component, OnInit} from '@angular/core';

import {StylingService} from "../../services/styling.service";
import {ItemService} from "../../services/item.service";
import {UndoRedoService} from "../../services/undo-redo.service";

@Component({
  selector: 'card-general-styling',
  templateUrl: './general-styling.component.html',
  styleUrls: ['./general-styling.component.css'],
  host: {
    '(mousedown)': 'onMouseDown()'
  }
})
export class GeneralStylingComponent implements OnInit {

  items: any[] = [];

  constructor(public stylingService: StylingService,
              private itemService: ItemService,
              private undoRedoService: UndoRedoService) {
  }

  ngOnInit() {
    this.stylingService.selectedFieldsChanges.subscribe(items => {
      this.items = items;
    });
  }

  onMouseDown() {
    this.items.forEach(item => item.isStyling = true);
    this.undoRedoService.setSelectionArray(this.items);
  }

  removeItems() {
    this.items.forEach(it => this.itemService.removeItem(it));
    this.items = [];
  }
}

