import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TeamActionTypes, RequestTeams, LoadTeams } from './team.actions';
import { TeamsService } from './teams.service';
import { mergeMap, map, withLatestFrom, filter } from 'rxjs/operators';
import { Team } from './models/team';
import { allTeamsLoaded } from './team.selectors';
import { AppState } from '../../reducers';
import { Store, select } from '@ngrx/store';

@Injectable()
export class TeamEffects {

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType<RequestTeams>(TeamActionTypes.RequestTeams),
    withLatestFrom(this.store.pipe(select(allTeamsLoaded()))),
    filter(([action, allTeamsLoaded]) => !allTeamsLoaded || action.payload.forceServerRequest), //filter action if teams are loaded
    mergeMap(([action, allTeamsLoaded]) => this.teamsService.getTeams$(action.payload.userEmail)),
    map((teams: Team[]) => new LoadTeams({ teams })) //dispatch the action to save the value in the store
  );

  constructor(private actions$: Actions, private teamsService: TeamsService, private store: Store<AppState>) {}

}
