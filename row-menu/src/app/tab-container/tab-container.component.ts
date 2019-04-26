import {AfterContentInit, Component, ElementRef, QueryList} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'menu-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css']
})
export class TabContainerComponent implements AfterContentInit {
  ngAfterContentInit(): void {
    this.buttons = this.el.nativeElement.querySelectorAll('button');
    this.onTabClick(null, 'general');
  }

  private buttons: QueryList<Element>;

  constructor(private router: Router,
              private el: ElementRef) {
  }

  onTabClick(event, route: string) {
    this.router.navigate([`/${route}`], {skipLocationChange: true});

    this.buttons.forEach(el => el.classList.remove('active'));

    if (event === null)
      this.buttons[0].classList.add('active');
    else event.target.classList.add('active');
  }
}
