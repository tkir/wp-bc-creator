import {Component, OnInit} from '@angular/core';
import {StylingService} from "../../services/styling.service";
import {AlignService} from "../../services/align.service";
import {UndoRedoService} from "../../services/undo-redo.service";

@Component({
  selector: 'card-align-styling',
  templateUrl: './align-styling.component.html',
  styleUrls: ['./align-styling.component.css'],
  host: {
    '(mousedown)': 'onMouseDown()'
  }
})
export class AlignStylingComponent implements OnInit {

  items: any[] = [];
  align: string = '';

  constructor(public stylingService: StylingService,
              public alService: AlignService,
              private undoRedoService: UndoRedoService) {
  }

  ngOnInit() {
    this.stylingService.selectedFieldsChanges.subscribe(items => {
      this.items = items;
      if (this.alService.isMultiselection) {
        if (items.every(it => it.left == items[0].left)) this.align = 'left';
        if (items.every(it => it.middle == items[0].middle)) this.align = 'middle';
        if (items.every(it => it.right == items[0].right)) this.align = 'right';
      }

    });
  }

  onMouseDown() {
    this.items.forEach(item => item.isStyling = true);
    this.undoRedoService.setSelectionArray(this.items);
  }

  setAlignment(alLine: string) {
    this.alService.alignTextFields(alLine);
  }
}
