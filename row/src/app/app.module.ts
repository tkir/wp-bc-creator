import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {EditorComponent} from './editor-container/editor/editor.component';
import {EditorContainerComponent} from './editor-container/editor-container.component';
import {DataService} from "./services/data.service";
import {ResultComponent} from './result/result.component';
import {MovableDirective} from './result/directives/movable.directive';
import {Store} from "./services/store";
import {DroppableDirective} from './result/directives/droppable.directive';
import {ImageService} from "./services/image.service";
import {BackgroundEditorComponent} from './background-editor/background-editor.component';
import {ColorPickerComponent} from './color-picker/color-picker.component';
import {HrComponent} from './result/hr/hr.component';
import {HrEditorComponent} from './graphics-container/hr-editor/hr-editor.component';
import {FieldResizeComponent} from './result/field-resize/field-resize.component';
import {AddResizeDirective} from './result/directives/add-resize.directive';
import {AlignableDirective} from './result/directives/alignable.directive';
import {AlignService} from "./services/align.service";
import {CardContainerComponent} from './card-container/card-container.component';
import {DesignContainerComponent} from './design-container/design-container.component';
import {AppRoutingModule} from "./app-routing.module";
import {ApiService} from "./services/api.service";
import {DesignService} from "./services/design.service";
import {CardService} from "./services/card.service";
import {DesignStore} from "./services/design-store";
import {PreviewService} from "./services/preview.service";
import {PreviewModalComponent} from './preview-modal/preview-modal.component';
import {OrderFormComponent} from "./order-form/order-form.component";
import {OptionsService} from "./services/options.service";
import {OrderOptionComponent} from './order-form/order-option/order-option.component';
import {OrderService} from "./services/order.service";
import {TextStyleComponent} from './editor-container/text-style/text-style.component';
import {SideSwitchComponent} from './side-switch/side-switch.component';
import {HintSliderComponent} from './hint-slider/hint-slider.component';
import {GraphicsContainerComponent} from './graphics-container/graphics-container.component';
import {LogoEditorComponent} from './graphics-container/logo-editor/logo-editor.component';
import {IconEditorComponent} from './graphics-container/icon-editor/icon-editor.component';
import {ControlContainerComponent} from './control-container/control-container.component';
import {ControlButtonsComponent} from './control-container/control-buttons/control-buttons.component';
import {DragService} from "./services/drag-and-drop/drag.service";
import {DraggableDirective} from "./services/drag-and-drop/draggable.directive";
import {DropTargetDirective} from "./services/drag-and-drop/drop-target.directive";
import {StylingService} from "./services/styling.service";
import {ItemService} from "./services/item.service";
import {UndoRedoService} from "./services/undo-redo.service";
import {UndoComponent} from './editor-container/undo/undo.component';
import {GridComponent} from "./result/grid/grid.component";
import {FrontBackComponent} from "./front-back/front-back.component";
import {GridService} from "./services/grid.service";
import {I18nService} from "./services/i18n.service";

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    EditorContainerComponent,
    ResultComponent,
    MovableDirective,
    DroppableDirective,
    DraggableDirective,
    DropTargetDirective,
    BackgroundEditorComponent,
    ColorPickerComponent,
    HrComponent,
    HrEditorComponent,
    LogoEditorComponent,
    IconEditorComponent,
    AddResizeDirective,
    FieldResizeComponent,
    AlignableDirective,
    CardContainerComponent,
    DesignContainerComponent,
    PreviewModalComponent,
    OrderFormComponent,
    OrderOptionComponent,
    TextStyleComponent,
    SideSwitchComponent,
    HintSliderComponent,
    GraphicsContainerComponent,
    ControlContainerComponent,
    ControlButtonsComponent,
    UndoComponent,
    GridComponent,
    FrontBackComponent
  ],
  entryComponents: [FieldResizeComponent, PreviewModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    OptionsService,
    CardService,
    Store,
    DesignStore,
    DataService,
    ImageService,
    AlignService,
    ApiService,
    DesignService,
    PreviewService,
    OrderService,
    StylingService,
    DragService,
    ItemService,
    GridService,
    UndoRedoService,
    I18nService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

