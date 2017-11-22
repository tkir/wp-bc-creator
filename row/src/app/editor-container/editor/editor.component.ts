import {
  Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {DataService} from "../../services/data.service";
import {CardData} from "../../data/CardData";
import {TextField} from "../../data/TextField";
import {Store} from "../../services/store";
import {ImageService} from "../../services/image.service";
import {DesignService} from "../../services/design.service";
import {PreviewService} from "../../services/preview.service";
import {PreviewModalComponent} from "../../preview-modal/preview-modal.component";
import {OptionsService} from "../../services/options.service";
import {OrderService} from "../../services/order.service";
import {TextFieldService} from "../../services/text-field.service";
import {CardService} from "../../services/card.service";


@Component({
  selector: 'card-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  model: CardData = null;
  selectedInput: any = null;

  private subscription: Subscription;

  constructor(private router: Router,
              private options: OptionsService,
              private dataService: DataService,
              private store: Store,
              private imageService: ImageService,
              private designService: DesignService,
              private previewService: PreviewService,
              private resolver: ComponentFactoryResolver,
              private orderService: OrderService,
              private textFieldService: TextFieldService,
              private cardService: CardService) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.model = cardData);
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
    // if (this.componentRef)
    //   this.componentRef.destroy();
  }

  addTextField(i?: number) {

    let newText: TextField = new TextField('',
      {
        fontFamily: this.getItemFont(),
        fontSize_mm: 1.2,
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        colorStr: '000',
        left_mm: 30,
        top_mm: 5
      }, this.options);

    if (this.model.texts && this.model.texts.length) {
      Object.keys(this.model.texts[i]).forEach(key => newText[key] = this.model.texts[i][key]);
      newText.top += 20;
    }

    this.model.texts.splice(i + 1, 0, newText);
    this.dataService.updateCard(this.model);
  }

  private getItemFont(): string {
    let fontFamily;
    this.model.fields.forEach(item => {
      if (item.instanceOf == 'Text') fontFamily = item.fontFamily;
    });

    return fontFamily;
  }

  removeItem(items, i) {
    items.splice(i, 1);

    this.dataService.updateCard(this.model);
  }

  focusItem(event, i) {
    this.model.fields.forEach(item => {
      if (item.isSelected) item.isSelected = false;
    });

    this.selectedInput = event.target;


    this.textFieldService.clear();
    this.textFieldService.add(this.model.texts[i]);
  }

  blurItem() {
    this.selectedInput = null;
  }

  onFocusReturn() {
    this.selectedInput.focus();
  }

  uploadImage(item, event) {
    if (event.target.files.length)
      this.imageService.uploadImage(item, event.target.files[0]);
  }

  // reset() {
  //   this.dataService.resetData();
  // }
  //
  // save() {
  //   this.designService.saveDesign(this.cardService.doubleSideCard)
  //     .subscribe(res =>
  //       this.previewService.updatePreviews()
  //         .subscribe(() => this.router.navigate([`/${res.Slug}`]))
  //     );
  // }
  //
  // delete() {
  //   if (confirm('Delete this business card design?'))
  //     this.designService.deleteDesign(this.model.slug)
  //       .subscribe(res =>
  //         this.previewService.updatePreviews()
  //           .subscribe(() => this.router.navigate(['/'])));
  // }
  //
  // getPreview() {
  //   this.previewService.getPreview(this.cardService.doubleSideCard);
  //   this.openModal();
  // }
  //
  // // TODO удалить в релизе
  // adminSaveDesign() {
  //   this.designService.adminSaveDesign(this.cardService.doubleSideCard)
  //     .subscribe(res => console.log(res));
  // }

  // @ViewChild("previewModalContainer", {read: ViewContainerRef}) container;
  // componentRef: ComponentRef<PreviewModalComponent> = null;
  // private modalSubscription: Subscription = null;
  //
  //
  // openModal() {
  //   this.orderService.card = this.cardService.doubleSideCard;
  //
  //   this.container.clear();
  //   const factory = this.resolver.resolveComponentFactory(PreviewModalComponent);
  //   this.componentRef = this.container.createComponent(factory);
  //   this.modalSubscription = this.componentRef.instance.closeModal
  //     .subscribe(() => this.closeModal());
  //   this.componentRef.instance.open();
  //   this.previewService.isModalOpen = true;
  // }
  //
  // closeModal() {
  //   this.previewService.isModalOpen = false;
  //
  //   this.modalSubscription.unsubscribe();
  //   this.modalSubscription = null;
  //
  //   this.componentRef.destroy();
  //   this.container.clear();
  //   this.componentRef = null;
  //   this.orderService.card = null;
  // }
}
