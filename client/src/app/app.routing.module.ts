/**
 * Created by mpaoluc on 13/01/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {InvestmentsComponent} from './investments/investments.component';
import {InvestmentsDashboardComponent} from './investments/investments-dashboard/investments-dashboard.component';
import {AuthResolver} from './auth-resolver.service';

const appRoutes : Routes = [
  {
    path : '',
    redirectTo : 'investments',
    pathMatch : 'full'
  },
  {
    path : 'investments',
    component : InvestmentsComponent,
    resolve : {
      authUser : AuthResolver
    },
    children : [
      { path : '', component : InvestmentsDashboardComponent }
    ]
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
