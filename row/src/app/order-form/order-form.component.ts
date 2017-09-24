import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'card-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {

  constructor(private elRef:ElementRef) { }

  orderDetailClick(){
    this.elRef.nativeElement.querySelector('.order-form-container')
      .classList.toggle('active');
  }

}
