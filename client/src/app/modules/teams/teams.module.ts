import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsDashboardComponent } from './components/teams-dashboard/teams-dashboard.component';
import { CustomMaterialDesignModule } from '../../modules/shared/custom-material-design.module';
import { TeamsEditComponent } from './components/teams-edit/teams-edit.component';
import { TeamsService } from './teams.service';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule,
    CustomMaterialDesignModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [TeamsDashboardComponent, TeamsEditComponent],
  providers : [ TeamsService ]
})
export class TeamsModule { }
