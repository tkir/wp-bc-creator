import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'card-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {

  @Output() colorSelected:EventEmitter<string>=new EventEmitter();

  setColor(color:string){
    this.colorSelected.emit(color);
  }

}
