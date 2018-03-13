import {Component, Input} from '@angular/core';
import {OptionsService} from "../../services/options.service";
import {UndoRedoService} from "../../services/undo-redo.service";
import {Icon} from "../../data/IconField";

@Component({
  selector: 'card-icon-editor',
  templateUrl: './icon-editor.component.html',
  styleUrls: ['./icon-editor.component.css']
})
export class IconEditorComponent {

  @Input() iconField: Icon = null;

  constructor(public options: OptionsService,
              private undoRedoService: UndoRedoService) {
  }

  rows: any[] = Array(5);
  columns: any[] = Array(5);

  selectIcon(unicode) {
    let json=this.iconField.json;
    this.iconField.unicode = unicode;

    this.undoRedoService.iconChange(this.iconField, json, this.iconField.json);
  }

}
