import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule, MatInputModule, MatTabsModule} from "@angular/material";

import {AppComponent} from './app.component';
import {DataService} from "./services/data.service";
import {ResultComponent} from './result/result.component';
import {MovableDirective} from './result/directives/movable.directive';
import {Store} from "./services/store";
import {DroppableDirective} from './result/directives/droppable.directive';
import {ImageService} from "./services/image.service";
import {BackgroundEditorComponent} from './background-editor/background-editor.component';
import {ColorPickerComponent} from './color-picker/color-picker.component';
import {HrComponent} from './result/hr/hr.component';
import {HrEditorComponent} from './editors-container/hr-editor/hr-editor.component';
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
import {SideSwitchComponent} from './side-switch/side-switch.component';
import {HintSliderComponent} from './hint-slider/hint-slider.component';
import {EditorsContainerComponent} from './editors-container/editors-container.component';
import {LogoEditorComponent} from './editors-container/logo-editor/logo-editor.component';
import {IconEditorComponent} from './editors-container/icon-editor/icon-editor.component';
import {ControlContainerComponent} from './control-container/control-container.component';
import {ControlButtonsComponent} from './control-container/control-buttons/control-buttons.component';
import {DragService} from "./services/drag-and-drop/drag.service";
import {DraggableDirective} from "./services/drag-and-drop/draggable.directive";
import {DropTargetDirective} from "./services/drag-and-drop/drop-target.directive";
import {StylingService} from "./services/styling.service";
import {ItemService} from "./services/item.service";
import {UndoRedoService} from "./services/undo-redo.service";
import {UndoComponent} from './undo/undo.component';
import {GridComponent} from "./result/grid/grid.component";
import {FrontBackComponent} from "./front-back/front-back.component";
import {GridService} from "./services/grid.service";
import {I18nService} from "./services/i18n.service";
import {ErrorService} from "./services/error.service";
import {StylingContainerComponent} from './styling-container/styling-container.component';
import {GeneralStylingComponent} from './styling-container/general-styling/general-styling.component';
import {FontStylingComponent} from './styling-container/font-styling/font-styling.component';
import {IconStylingComponent} from './styling-container/icon-styling/icon-styling.component';
import {HrStylingComponent} from './styling-container/hr-styling/hr-styling.component';
import {TabService} from "./services/tab.service";
import {TextEditorComponent} from "./editors-container/text-editor/text-editor.component";

@NgModule({
  declarations: [
    AppComponent,
    TextEditorComponent,
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
    SideSwitchComponent,
    HintSliderComponent,
    EditorsContainerComponent,
    ControlContainerComponent,
    ControlButtonsComponent,
    UndoComponent,
    GridComponent,
    FrontBackComponent,
    StylingContainerComponent,
    GeneralStylingComponent,
    FontStylingComponent,
    IconStylingComponent,
    HrStylingComponent
  ],
  entryComponents: [FieldResizeComponent, PreviewModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule
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
    I18nService,
    ErrorService,
    TabService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

