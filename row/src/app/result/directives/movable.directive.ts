import {
  ComponentFactoryResolver, Directive, ElementRef, Input, OnDestroy, OnInit, Type
} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {CardField} from "../../data/interfaces";
import {AddResizeDirective} from "./add-resize.directive";
import {FieldResizeComponent} from "../field-resize/field-resize.component";
import {ResultComponent} from "../result.component";
import {getMax, getMin, MovEl, updateOffset} from '../../utils/size.util';
import {Background} from "../../data/Background";
import {AlignService} from "../../services/align.service";
import {StylingService} from "../../services/styling.service";
import {UndoRedoService} from "../../services/undo-redo.service";
import {TabService} from "../../services/tab.service";
import {CardData} from "../../data/CardData";
import {Store} from "../../services/store";


@Directive({
  selector: '[fieldMovable]',
  host: {
    '(mousedown)': 'onMouseDown($event)',
    '(mousemove)': 'onMouseMove($event)',
    '(window:mouseup)': 'onMouseUp()'
  }
})
export class MovableDirective implements OnInit, OnDestroy {

  @Input() dataArr = [];
  @Input() card: ResultComponent = null;

  selectedItems: MovEl[] = [];
  private startMovingCoords: { x: number, y: number } = null;
  private startResizing = false;

  constructor(private el: ElementRef,
              private store: Store,
              private componentFactoryResolver: ComponentFactoryResolver,
              private alService: AlignService,
              private stylingService: StylingService,
              private undoRedoService: UndoRedoService,
              private tabService: TabService) {
  }

  cardData: CardData = null;
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.store.changes
      .subscribe((cardData: any) => {
        this.cardData = cardData;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  private skipSelection() {
    this.selectedItems = [];
    this.dataArr.forEach((item: CardField) => item.isSelected = false);

    this.alService.fields = [];
    this.alService.isMultiselection = false;

    this.stylingService.clear();
  }

  private findCardFieldByTarget(target: HTMLElement) {
    let left = parseInt(getComputedStyle(target).left);
    let top = parseInt(getComputedStyle(target).top);

    return this.dataArr.find((it: CardField) => it.left == left && it.top == top);
  }


  onMouseDown(event) {
    if (event.which != 1) return;

    //find .card-field
    let target: HTMLElement = event.target;
    while (target != this.el.nativeElement) {

      //нажатие на поле с элементом
      if (target.classList.contains('card-field')) break;

      //если нажали на fieldResize
      if (target.tagName == 'CARD-FIELD-RESIZE') {
        this.startResizing = true;
        this.resizeComponent.fieldResize.updateMax();
        this.undoRedoService.setSelectionArray(this.selectedItems.map(it => it.item));
        return;
      }

      target = target.parentElement;
      if (!target) {
        this.skipSelection();
        return;
      }
    }

    //нажатие на background или grid
    if (this.el.nativeElement == target) {
      this.skipSelection();
      return;
    }

    this.startMovingCoords = {x: event.pageX, y: event.pageY};

    let item: CardField = this.findCardFieldByTarget(target);
    if (!item) {
      this.skipSelection();
      return;
    }

    //multiselection
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey) {
      this.multiselection(item);
    }

    this.updateSelectionArray(item, target, event);
    this.undoRedoService.setSelectionArray(this.selectedItems.map(it => it.item));

    //  установить мульти alService, отправить в alService selectionArray
    if (this.selectedItems.length > 1) {
      this.alService.isMultiselection = true;
      this.selectedItems.forEach(obj => this.alService.fields.push(obj.item));
    }
    else {
      this.alService.fields = [];
      this.alService.isMultiselection = false;
    }

    this.stylingService.add(item);
    this.tabService.selectedField = item.instanceOf;
  }

  private multiselection(item: CardField) {
    let isMulti = false;
    this.selectedItems.forEach(obj => {
      if (obj.item == item) isMulti = true;
    });
    if (!isMulti) {
      this.skipSelection();
    }
  }

  //set item selected, add to selection array
  private updateSelectionArray(item: CardField, target: Element, event: MouseEvent) {

    let isDublingItems = false;
    this.selectedItems.forEach(obj => {
      obj.dev = {
        x: event.pageX - obj.item.left,
        y: event.pageY - obj.item.top
      };
      if (obj.item == item) {
        isDublingItems = true;
      }
    });
    if (!isDublingItems){
      this.selectedItems.push({
        item: item,
        elem: target,
        dev: {
          x: event.pageX - item.left,
          y: event.pageY - item.top
        }
      });
      item.updatePositionLimits();
    }
  }

  onMouseMove(event: MouseEvent) {
    //ресайз элемента
    if (this.startResizing && this.resizeComponent.fieldResizeRef) {
      this.resizeComponent.fieldResize.resize(event);
      return;
    }


    if (!this.startMovingCoords) return;

    //check random deviations more then 2px
    if (Math.abs(this.startMovingCoords.x - event.pageX) +
      Math.abs(this.startMovingCoords.y - event.pageY) > 2) {

      this.selectedItems.forEach((it: MovEl) => updateOffset(it, event));

    }
  }

  onMouseUp() {
    this.startMovingCoords = null;
    this.startResizing = false;

    //проверяем: не мультиселект, нет fieldResize, ели есть но другой элемент - удаляем старый добавляем новый
    if (this.selectedItems.length == 1) {
      if (!this.resizeComponent.fieldResizeRef)
        this.addResize(this.selectedItems[0].item, this.selectedItems[0].elem);
      else {
        if (this.resizeComponent.item != this.selectedItems[0].item) {
          this.removeResize();
          this.addResize(this.selectedItems[0].item, this.selectedItems[0].elem);
        }
      }
    }
    else this.removeResize();

    this.undoRedoService.itemsChange(this.selectedItems.map(it => it.item));
  }

  //работаем с fieldResize
  private resizeComponent: {
    fieldResizeRef: any
    item: CardField,
    fieldResize: FieldResizeComponent
  } = {
    fieldResizeRef: null,
    item: null,
    fieldResize: null
  };
  private fieldResizeComponent: Type<any> = FieldResizeComponent;

  //вставляем fieldResize
  private addResize(item, elem: Element) {
    let target = elem.querySelector('[cardAddResize]');

    //если поле не resizable
    //или полю уже добавлено fieldResize
    if (!target || target.getElementsByTagName('CARD-FIELD-RESIZE').length) return;

    this.resizeComponent.item = item;
    let resizable: AddResizeDirective = this.card.addResizeDirectives.find(
      (dir: AddResizeDirective) => dir.viewContainerRef.element.nativeElement == target);
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.fieldResizeComponent);
    this.resizeComponent.fieldResizeRef = resizable.viewContainerRef.createComponent(componentFactory);
    this.resizeComponent.fieldResize = <FieldResizeComponent>this.resizeComponent.fieldResizeRef.instance;
    this.resizeComponent.fieldResize.init(item, target, this.dataArr.find((field: CardField) => field.instanceOf == 'Background'));
  }

  //удаляем fieldResize
  private removeResize() {
    if (this.resizeComponent.fieldResizeRef) {
      this.resizeComponent.fieldResizeRef.destroy();
      this.resizeComponent.fieldResizeRef = null;
      this.resizeComponent.item = null;
      this.resizeComponent.fieldResize = null;
    }
  }

}
