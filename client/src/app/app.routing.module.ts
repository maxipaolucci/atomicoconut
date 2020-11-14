import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from 'src/app/auth.guard';

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
    path: 'investments',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/investments/investments.module').then(m => m.InvestmentsModule)
  },
  {
    path: 'properties',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/properties/properties.module').then(m => m.PropertiesModule)
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
    RouterModule.forRoot(appRoutes, { enableTracing: false, relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
