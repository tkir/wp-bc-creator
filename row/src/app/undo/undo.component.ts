import {Component} from '@angular/core';
import {UndoRedoService} from "../services/undo-redo.service";

@Component({
  selector: 'card-undo',
  templateUrl: './undo.component.html',
  styleUrls: ['./undo.component.css'],
  host:{
    '(window:keypress)': 'onKeyPress($event)'
  }
})
export class UndoComponent {

  constructor(public undoRedoService: UndoRedoService) {
  }

  onKeyPress(event: KeyboardEvent) {
    if (!event.ctrlKey && !event.metaKey) return;
    let key = (event.which == null) ? event.keyCode : event.charCode;
    if (key != 26) return;

    this.undoRedoService.undo();
  }

}
