import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from './app.component';
import {TabContainerComponent} from './tab-container/tab-container.component';
import {TabGeneralComponent} from './tab-general/tab-general.component';
import {TabDesignComponent} from './tab-design/tab-design.component';
import {TabOrderDetailComponent} from './tab-order-detail/tab-order-detail.component';
import {Page404Component} from './page-404/page-404.component';
import {OptionsService} from "./services/options.service";
import {ApiService} from "./services/api.service";
import {UpdateService} from './services/update.service';

@NgModule({
  declarations: [
    AppComponent,
    TabContainerComponent,
    TabGeneralComponent,
    TabDesignComponent,
    TabOrderDetailComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [OptionsService,
    ApiService,
    UpdateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
