import {
  Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {PreviewModalComponent} from "../preview-modal/preview-modal.component";
import {Subscription} from "rxjs/Subscription";
import {OrderService} from "../services/order.service";
import {CardService} from "../services/card.service";
import {PreviewService} from "../services/preview.service";

@Component({
  selector: 'card-control-container',
  templateUrl: './control-container.component.html',
  styleUrls: ['./control-container.component.css']
})
export class ControlContainerComponent implements OnInit, OnDestroy {

  constructor(private resolver: ComponentFactoryResolver,
              private orderService: OrderService,
              private cardService: CardService,
              private previewService: PreviewService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.componentRef)
      this.componentRef.destroy();
  }

  @ViewChild("previewModalContainer", {read: ViewContainerRef}) container;
  componentRef: ComponentRef<PreviewModalComponent> = null;
  private modalSubscription: Subscription = null;


  openModal() {
    this.orderService.card = this.cardService.doubleSideCard;

    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(PreviewModalComponent);
    this.componentRef = this.container.createComponent(factory);
    this.modalSubscription = this.componentRef.instance.closeModal
      .subscribe(() => this.closeModal());
    this.componentRef.instance.open();
    this.previewService.isModalOpen = true;
  }

  closeModal() {
    this.previewService.isModalOpen = false;

    this.modalSubscription.unsubscribe();
    this.modalSubscription = null;

    this.componentRef.destroy();
    this.container.clear();
    this.componentRef = null;
    this.orderService.card = null;
  }

}
