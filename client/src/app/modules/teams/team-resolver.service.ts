import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../users/models/user';
import { State } from '../../main.reducer';
import { Store, select } from '@ngrx/store';
import { Team } from './models/team';
import { teamBySlugSelector } from './team.selectors';
import { RequestOne } from './team.actions';
import { userSelector } from '../users/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class TeamResolver implements Resolve<Team> {
  private user: User = null;

  constructor(
    private store: Store<State>
  ) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<never> | Observable<Team> {
    const methodTrace = `${this.constructor.name} > resolve() > `; // for debugging  
    
    const teamSlug = route.paramMap.get('slug');
    this.store.select(userSelector()).subscribe((user: User) => this.user = user); 
    
    return this.store.pipe(
      select(teamBySlugSelector(teamSlug)),
      tap((team: Team) => {
        if (!team) {
          this.store.dispatch(new RequestOne({ userEmail: this.user.email, slug: teamSlug }));
        }
      }),
      first((team: Team) => !!team)
    );
  }
}
