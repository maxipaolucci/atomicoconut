import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsDashboardComponent } from './components/teams-dashboard/teams-dashboard.component';
import { CustomMaterialDesignModule } from '../../modules/shared/custom-material-design.module';
import { TeamsEditComponent } from './components/teams-edit/teams-edit.component';
import { TeamsService } from './teams.service';
import { AddPersonToTeamDialogComponent } from './components/add-person-to-team-dialog/add-person-to-team-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromTeam from './team.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TeamEffects } from './team.effects';
import { TeamResolver } from './team-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule,
    CustomMaterialDesignModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    StoreModule.forFeature(fromTeam.teamsFeatureKey, fromTeam.reducer),
    EffectsModule.forFeature([TeamEffects])
  ],
  declarations: [
    TeamsDashboardComponent, 
    TeamsEditComponent, 
    AddPersonToTeamDialogComponent
  ],
  entryComponents: [
    AddPersonToTeamDialogComponent //added as material doc suggest to allow AOT on this on the fly created class
  ],
  providers : [ TeamsService, TeamResolver ]
})
export class TeamsModule { }
