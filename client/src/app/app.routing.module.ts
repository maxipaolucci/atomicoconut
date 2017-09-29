/**
 * Created by mpaoluc on 13/01/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {AuthResolver} from './auth-resolver.service';
import { WelcomeComponent } from './components/welcome/welcome.component';
const appRoutes : Routes = [
  {
    path : '',
    redirectTo : 'welcome',
    pathMatch : 'full'
  },
  {
    path : 'welcome',
    component : WelcomeComponent
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
