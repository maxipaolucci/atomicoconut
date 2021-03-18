import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { State } from '../../main.reducer';
import { Store, select } from '@ngrx/store';
import { Team } from './models/team';
import { teamBySlugSelector } from './team.selectors';
import { RequestOne } from './team.actions';

@Injectable({
  providedIn: 'root'
})
export class TeamResolver implements Resolve<Team> {

  constructor(
    private store: Store<State>
  ) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<never> | Observable<Team> {
    const methodTrace = `${this.constructor.name} > resolve() > `; // for debugging  
    
    const teamSlug = route.paramMap.get('slug');
    
    return this.store.pipe(
      select(teamBySlugSelector(teamSlug)),
      tap((team: Team) => {
        if (!team) {
          this.store.dispatch(new RequestOne({ slug: teamSlug }));
        }
      }),
      first((team: Team) => !!team)
    );
  }
}
