import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { TabGeneralComponent } from './tab-general/tab-general.component';
import { TabDesignComponent } from './tab-design/tab-design.component';
import { TabOrderDetailComponent } from './tab-order-detail/tab-order-detail.component';
import { Page404Component } from './page-404/page-404.component';

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
