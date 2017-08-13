import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {DesignService} from "../services/design.service";
import {AppConfigService} from "../services/app-config.service";

@Component({
  selector: 'card-design-container',
  templateUrl: './design-container.component.html',
  styleUrls: ['./design-container.component.css']
})
export class DesignContainerComponent implements OnInit, OnDestroy {

  public allowedDesigns = [];
  public imagePath: string = '';
  private subscription: Subscription = null;

  constructor(private designService: DesignService,
              private config: AppConfigService) {
  }

  ngOnInit() {
    this.subscription = this.designService.getAllowedDesigns()
      .subscribe((designs: any) => this.allowedDesigns = designs);

    this.imagePath = this.config.get('imagePath');
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
