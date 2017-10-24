import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule}   from '@angular/forms';
import {HttpModule} from "@angular/http";

import {AppComponent} from './app.component';
import {EditorComponent} from './editor/editor.component';
import {DesignComponent} from './design/design.component';
import {EditorContainerComponent} from './editor-container/editor-container.component';
import {DataService} from "./services/data.service";
import {ResultComponent} from './result/result.component';
import {MovableDirective} from './result/directives/movable.directive';
import {Store} from "./services/store";
import {DroppableDirective} from './result/directives/droppable.directive';
import {ImageService} from "./services/image.service";
import {BackgroundEditorComponent} from './editor-container/background-editor/background-editor.component';
import {ColorPickerComponent} from './editor-container/color-picker/color-picker.component';
import {HrComponent} from './hr/hr.component';
import {HrEditorComponent} from './editor/hr-editor/hr-editor.component';
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
import { TextStyleComponent } from './editor-container/text-style/text-style.component';
import {TextFieldService} from "./services/text-field.service";
import { SideSwitchComponent } from './side-switch/side-switch.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    DesignComponent,
    EditorContainerComponent,
    ResultComponent,
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
    OrderOptionComponent,
    TextStyleComponent,
    SideSwitchComponent
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
    PreviewService,
    OrderService,
    TextFieldService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

