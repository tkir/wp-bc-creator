import {Component} from '@angular/core';
import {OptionsService} from "../../services/options.service";

@Component({
  selector: 'card-icon-editor',
  templateUrl: './icon-editor.component.html',
  styleUrls: ['./icon-editor.component.css']
})
export class IconEditorComponent {

  constructor(public options: OptionsService) {
  }

  rows: any[] = Array(5);
  columns: any[] = Array(5);

}
