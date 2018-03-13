import {Component, Input} from '@angular/core';
import {TextField} from "../../data/TextField";
import {StylingService} from "../../services/styling.service";
import {UndoRedoService} from "../../services/undo-redo.service";

@Component({
  selector: 'card-text-editor2',
  templateUrl: './text-editor2.component.html',
  styleUrls: ['./text-editor2.component.css']
})
export class TextEditor2Component {

  @Input() textField:TextField;

  constructor(private stylingService: StylingService,
              private undoRedoService: UndoRedoService) { }

  focusItem() {
    this.stylingService.clear();
    this.stylingService.add(this.textField);
    this.undoRedoService.textChange(this.textField, this.textField.text, null);
  }

  blurItem() {
    this.undoRedoService.textChange(this.textField, null, this.textField.text);
  }

}
