import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Line} from "../../data/Line";
import {Store} from "../../services/store";
import {Subscription} from "rxjs/Subscription";
import {AppConfigService} from "../../services/app-config.service";

@Component({
  selector: 'card-hr-editor',
  templateUrl: './hr-editor.component.html',
  styleUrls: ['./hr-editor.component.css']
})
export class HrEditorComponent implements OnInit, OnDestroy {

  @Input() hr: Line = null;

  private subscription: Subscription = null;
  background: any;
  allowedHrDesigns: string[] = [];

  constructor(private config:AppConfigService,
              private store: Store) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) =>
        this.background = cardData.background
      );

    this.allowedHrDesigns=this.config.get('allowedHrDesigns');
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = null;
  }

  updateHr(param: string, res: any) {
    if (param == 'design')
      this.hr.design = res;
    else if (param == 'thickness')
      this.hr.thickness = res;
    else if (param == 'color')
      this.hr._color = res;
  }

  changeOrientation() {
    this.hr.isHorizontal = !this.hr.isHorizontal;
    this.hr.onChangeBgSize(this.background);
  }

}
