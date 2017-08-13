import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {CardContainerComponent} from "./card-container/card-container.component";

const APP_ROUTERS: Routes = [
  {path: '**', component: CardContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTERS)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
