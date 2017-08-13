import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'card-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {

  @Output() colorSelected:EventEmitter<string>=new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  setColor(color:string){
    this.colorSelected.emit(color);
  }

}
