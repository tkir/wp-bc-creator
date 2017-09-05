import {
  Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DataService} from "../services/data.service";
import {CardData} from "../data/CardData";
import {TextField} from "../data/TextField";
import {Subscription} from "rxjs/Subscription";
import {Store} from "../services/store";
import {ImageService} from "../services/image.service";
import {Logo} from "../data/Logo";
import {Line} from "../data/Line";
import {PdfService} from "../services/pdf.service";
import {DesignService} from "../services/design.service";
import {PreviewService} from "../services/preview.service";
import {PreviewModalComponent} from "../preview-modal/preview-modal.component";

@Component({
  selector: 'card-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  host: {
    '(window:mouseup)': 'onMouseUp($event)'
  }
})
export class EditorComponent implements OnInit, OnDestroy {

  model: CardData = null;
  selectedItem: TextField = null;
  selectedInput: any = null;

  private subscription: Subscription;

  constructor(private dataService: DataService,
              private store: Store,
              private imageService: ImageService,
              private designService: DesignService,
              private pdfService: PdfService,
              private previewService: PreviewService,
              private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => this.model = cardData);
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
    if (this.componentRef)
      this.componentRef.destroy();
  }

  addTextField(items: TextField[], i?: number) {

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
      });

    if (items && items.length) {
      Object.keys(items[i]).forEach(key => newText[key] = items[i][key]);
      newText.top += 20;
    }

    items.push(newText);
    this.dataService.updateCard(this.model);
  }

  addLogo(items: Logo[], i?: number) {

    let newLogo: Logo = new Logo('',
      {
        width_mm: 22,
        height_mm: 10,
        left_mm: 5,
        top_mm: 5
      });

    items.push(newLogo);
    this.dataService.updateCard(this.model);
  }

  addLine(lines: Line[], i) {
    let newLine: Line = new Line(
      {
        left_mm: 0,
        top_mm: 30,
        length_mm: 45,
        _thickness: 1,
        isHorizontal: true,
        design: 'solid',
        _color: '00f'
      });
    lines.push(newLine);
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

  focusItem(item: TextField, event) {
    this.model.fields.forEach(item => {
      if (item.isSelected) item.isSelected = false;
    });

    item.isSelected = true;
    this.selectedItem = item;
    this.selectedInput = event.target;
  }

  blurItem() {
    if (!this.selectedItem.isStyling) {
      this.selectedItem.isSelected = false;
      this.selectedItem = null;
      this.selectedInput = null;
    }
  }

  onFocusReturn() {
    this.selectedInput.focus();
  }

  uploadImage(item, event) {
    if (event.target.files.length)
      this.imageService.uploadImage(item, event.target.files[0]);
  }

  save() {
    this.designService.saveDesign(this.model);
  }

  getPDF() {
    this.pdfService.getPdf(this.model.json);
  }

  getPreview() {
    this.previewService.getPreview(this.model.json);
    this.openModal();
  }

  @ViewChild("previewModalContainer", {read: ViewContainerRef}) container;
  componentRef: ComponentRef<PreviewModalComponent> = null;
  public modalId = 'bc-creator-preview';

  openModal() {
    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(PreviewModalComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.id = this.modalId;
    this.componentRef.instance.open();
    this.previewService.isModalOpen = true;
  }

  closeModal() {
    this.previewService.isModalOpen = false;
    this.componentRef.instance.close();
    this.componentRef.destroy();
    this.container.clear();
    this.componentRef = null;
  }

  onMouseUp(event) {
    if (!this.previewService.isModalOpen)return;
    if (!event.target.closest(`#${this.modalId}`))
      this.closeModal();
  }
}
