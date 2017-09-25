import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {FormsModule}   from '@angular/forms';

import {AppComponent} from './app.component';
import {EditorComponent} from './editor/editor.component';
import {DesignComponent} from './design/design.component';
import {EditorContainerComponent} from './editor-container/editor-container.component';
import {HttpModule} from "@angular/http";

import {DataService} from "./services/data.service";
import {ResultComponent} from './result/result.component';
import {StyleEditorComponent} from './editor/style-editor/style-editor.component';
import {MovableDirective} from './result/directives/movable.directive';
import {Store} from "./services/store";
import {DroppableDirective} from './result/directives/droppable.directive';
import {ImageService} from "./services/image.service";
import {BackgroundEditorComponent} from './editor/background-editor/background-editor.component';
import {ColorPickerComponent} from './editor/color-picker/color-picker.component';
import {HrComponent} from './hr/hr.component';
import {HrEditorComponent} from './editor/hr-editor/hr-editor.component';
import {FieldResizeComponent} from './result/field-resize/field-resize.component';
import {AddResizeDirective} from './result/directives/add-resize.directive';
import {AlignableDirective} from './result/directives/alignable.directive';
import {AlignService} from "./services/align.service";
import { CardContainerComponent } from './card-container/card-container.component';
import { DesignContainerComponent } from './design-container/design-container.component';
import {AppRoutingModule} from "./app-routing.module";
import {ApiService} from "./services/api.service";
import {DesignService} from "./services/design.service";
import {CardService} from "./services/card.service";
import {PdfService} from "./services/pdf.service";
import {DesignStore} from "./services/design-store";
import {PreviewService} from "./services/preview.service";
import { PreviewModalComponent } from './preview-modal/preview-modal.component';
import {OrderFormComponent} from "./order-form/order-form.component";
import {OptionsService} from "./services/options.service";
import { OrderOptionComponent } from './order-form/order-option/order-option.component';
import {OrderService} from "./services/order.service";

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    DesignComponent,
    EditorContainerComponent,
    ResultComponent,
    StyleEditorComponent,
    MovableDirective,
    DroppableDirective,
    BackgroundEditorComponent,
    ColorPickerComponent,
    HrComponent,
    HrEditorComponent,
    AddResizeDirective,
    FieldResizeComponent,
    AlignableDirective,
    CardContainerComponent,
    DesignContainerComponent,
    PreviewModalComponent,
    OrderFormComponent,
    OrderOptionComponent
  ],
  entryComponents: [FieldResizeComponent, PreviewModalComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
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
    PdfService,
    PreviewService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

