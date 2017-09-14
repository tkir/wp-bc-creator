import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {TabDesignComponent} from "./tab-design/tab-design.component";
import {TabGeneralComponent} from './tab-general/tab-general.component';
import {TabOrderDetailComponent} from './tab-order-detail/tab-order-detail.component';
import {Page404Component} from './page-404/page-404.component';

const APP_ROUTERS: Routes = [
  {path: 'general', component: TabGeneralComponent},
  {path: 'design', component: TabDesignComponent},
  {path: 'order-detail', component: TabOrderDetailComponent},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTERS)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
