import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'menu-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css']
})
export class TabContainerComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    this.onGeneralClick();
  }

  onGeneralClick(){
    this.router.navigate(['/general'], {skipLocationChange: true})
  }
  onDesignClick(){
    this.router.navigate(['/design'], {skipLocationChange: true})
  }
  onOrderDetailClick(){
    this.router.navigate(['/order-detail'], {skipLocationChange: true})
  }
}
