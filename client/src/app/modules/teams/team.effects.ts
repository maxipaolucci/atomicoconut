import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TeamActionTypes, RequestTeams, LoadTeams } from './team.actions';
import { TeamsService } from './teams.service';
import { mergeMap, map } from 'rxjs/operators';
import { Team } from './models/team';



@Injectable()
export class TeamEffects {

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType<RequestTeams>(TeamActionTypes.RequestTeams),
    mergeMap(action => this.teamsService.getTeams$(action.payload.userEmail)),
    map((teams: Team[]) => new LoadTeams({ teams })) //dispatch the action to save the value in the store
  );

  constructor(private actions$: Actions, private teamsService: TeamsService) {}

}
