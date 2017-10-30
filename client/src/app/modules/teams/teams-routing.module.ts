import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsDashboardComponent } from './components/teams-dashboard/teams-dashboard.component';
import { TeamsEditComponent } from './components/teams-edit/teams-edit.component';
import { AuthResolver } from '../../auth-resolver.service';

const routes: Routes = [
  {
    path : 'teams',
    children : [
      { 
        path : '', 
        pathMatch : 'full',
        component : TeamsDashboardComponent,
        resolve : {
          authUser : AuthResolver
        }
      },
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
