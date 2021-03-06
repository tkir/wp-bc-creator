import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {DesignService} from "../services/design.service";
import {Preview} from "../services/design-store";

@Component({
  selector: 'card-design-container',
  templateUrl: './design-container.component.html',
  styleUrls: ['./design-container.component.css']
})
export class DesignContainerComponent implements OnInit, OnDestroy {

  @Output() designSelected: EventEmitter<string> = new EventEmitter<string>();
  private subscription: Subscription = null;

  public previews: Preview[];

  constructor(private designService: DesignService) {
  }

  ngOnInit() {
    this.subscription = this.designService.getPreviews()
      .subscribe((previews: any) => this.previews = previews);
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  onDesignSelected(des: string) {
    this.designSelected.emit(des);
  }
}
