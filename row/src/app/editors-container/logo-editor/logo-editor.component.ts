import {Component, Input} from '@angular/core';
import {Logo} from "../../data/Logo";
import {UndoRedoService} from "../../services/undo-redo.service";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'card-logo-editor',
  templateUrl: './logo-editor.component.html',
  styleUrls: ['./logo-editor.component.css']
})
export class LogoEditorComponent {

  @Input() logoField: Logo;

  constructor(private undoRedoService: UndoRedoService,
              private itemService: ItemService) {
  }

  replace(src) {
    if (src == null) {
      this.itemService.removeItem(this.logoField);
      return;
    }

    let json = this.logoField.json;
    this.logoField.src = src;
    this.undoRedoService.logoChange(this.logoField, json, this.logoField.json);
  }

  setColor(color){
    let json = this.logoField.json;
    this.logoField.backgroundColor = color;
    this.undoRedoService.logoChange(this.logoField, json, this.logoField.json);
  }

  rotate(deg){
    let json = this.logoField.json;
    this.logoField.rotate += deg;
    this.undoRedoService.logoChange(this.logoField, json, this.logoField.json);
  }
}
