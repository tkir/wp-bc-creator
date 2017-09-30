import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'card-order-option',
  templateUrl: './order-option.component.html',
  styleUrls: ['./order-option.component.css']
})
export class OrderOptionComponent implements OnInit {

  @Input() option: { id: number, Name: string, Values: [{ Value: string, Rate: string, isSelected: boolean }] };
  @Output() optionSelected: EventEmitter<{ optionName: string, Value: string, Rate: string }> = new EventEmitter();

  public selectedOption: { Value: string, Rate: string };

  constructor() {
  }

  ngOnInit() {
    this.selectedOption = this.option.Values.find(v => v.isSelected);
  }

  public onChange(selectedOpt) {
    this.selectedOption = selectedOpt;
    this.optionSelected.emit({optionName: this.option.Name, Value: selectedOpt.Value, Rate: selectedOpt.Rate});
  }

}
