import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path : 'welcome',
    component : WelcomeComponent
  },
  {
    path : 'page-not-found',
    component : PageNotFoundComponent
  },
  {
    path: 'calculators',
    loadChildren: () => import('./modules/calculators/calculators.module').then(m => m.CalculatorsModule)
  },
  {
    path : '',
    redirectTo : 'welcome',
    pathMatch : 'full'
  },
  {
    path : '**',
    component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
