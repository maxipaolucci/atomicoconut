/**
 * Created by mpaoluc on 13/01/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {InvestmentsComponent} from './investments/investments.component';

const appRoutes : Routes = [
  {
    path : '',
    redirectTo : 'investments',
    pathMatch : 'full'
  },
  {
    path : 'investments',
    component : InvestmentsComponent
  }
  // {
  //   path : 'page-not-found',
  //   component : PageNotFoundComponent
  // },
  // {
  //   path : '**',
  //   component : PageNotFoundComponent
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
