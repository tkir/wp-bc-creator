import {Component, OnInit} from '@angular/core';
import {OptionsService} from "../services/options.service";

@Component({
  selector: 'card-hint-slider',
  templateUrl: './hint-slider.component.html',
  styleUrls: ['./hint-slider.component.css']
})
export class HintSliderComponent implements OnInit {

  hint: string;

  constructor(private options: OptionsService) {
  }

  ngOnInit() {
    this.hint = this.options.hint;
  }

}
