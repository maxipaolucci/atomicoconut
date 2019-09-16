import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../users/models/user';
import { UsersService } from '../users/users.service';
import { MatDialog } from '@angular/material';
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
      private usersService: UsersService, 
      public dialog: MatDialog,
      private store: Store<State>
  ) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<never> | Observable<Team> {
    const methodTrace = `${this.constructor.name} > resolve() > `; // for debugging  
    
    const teamSlug = route.paramMap.get('slug');
    const user: User = this.usersService.getUser(); //thanks to auth guard I know there is a user logged in
    
    return this.store.pipe(
      select(teamBySlugSelector(teamSlug)),
      tap((team: Team) => {
        if (!team) {
          this.store.dispatch(new RequestOne({ userEmail: user.email, slug: teamSlug }));
        }
      }),
      first((team: Team) => !!team)
    );
  }
}
