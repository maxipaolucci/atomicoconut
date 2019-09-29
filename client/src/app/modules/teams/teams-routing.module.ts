import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsDashboardComponent } from './components/teams-dashboard/teams-dashboard.component';
import { TeamsEditComponent } from './components/teams-edit/teams-edit.component';
import { AuthGuard } from '../../auth.guard';
import { TeamResolver } from './team-resolver.service';

const routes: Routes = [
  {
    path : 'teams',
    canActivate: [ AuthGuard ],
    children : [
      { 
        path : 'create', 
        component : TeamsEditComponent
      },
      { 
        path : 'edit/:slug', 
        component : TeamsEditComponent,
        resolve : {
          team : TeamResolver
        } 
      },
      { 
        path : '', 
        pathMatch : 'full',
        component : TeamsDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
