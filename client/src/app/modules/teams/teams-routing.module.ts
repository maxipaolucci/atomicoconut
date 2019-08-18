import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsDashboardComponent } from './components/teams-dashboard/teams-dashboard.component';
import { TeamsEditComponent } from './components/teams-edit/teams-edit.component';
import { AuthResolver } from '../../auth-resolver.service';
import { AuthGuard } from '../../auth.guard';
import { TeamsResolver } from './teams-resolver.service';

const routes: Routes = [
  {
    path : 'teams',
    canActivate: [ AuthGuard ],
    children : [
      { 
        path : 'create', 
        component : TeamsEditComponent,
        resolve : {
          authUser : AuthResolver
        } 
      },
      { 
        path : 'edit/:slug', 
        component : TeamsEditComponent,
        resolve : {
          authUser : AuthResolver
        } 
      },
      { 
        path : '', 
        pathMatch : 'full',
        component : TeamsDashboardComponent,
        resolve : {
          teams: TeamsResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
