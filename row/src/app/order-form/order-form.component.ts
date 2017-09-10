import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'card-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  constructor(private elRef:ElementRef) { }

  ngOnInit() {
  }

  orderDetailClick(){
    this.elRef.nativeElement.querySelector('.order-form-container')
      .classList.toggle('active');
  }

}
