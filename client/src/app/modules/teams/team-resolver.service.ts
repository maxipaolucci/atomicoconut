import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../users/models/user';
import { UsersService } from '../users/users.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProgressBarDialogComponent } from '../shared/components/progress-bar-dialog/progress-bar-dialog.component';
import { AppState } from '../../reducers';
import { Store, select } from '@ngrx/store';
import { Team } from './models/team';
import { teamBySlugSelector, loadingSelector } from './team.selectors';
import { RequestOne } from './team.actions';
import { LoadingData } from 'src/app/models/loadingData';
import { DEFAULT_DIALOG_WIDTH_DESKTOP } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class TeamResolver implements Resolve<Team> {

  constructor(
      private usersService: UsersService, 
      public dialog: MatDialog,
      private store: Store<AppState>
  ) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<never> | Observable<Team> {
    const methodTrace = `${this.constructor.name} > resolve() > `; // for debugging  
    
    const teamSlug = route.paramMap.get('slug');

    const user: User = this.usersService.getUser(); //thanks to auth guard I know there is a user logged in
    
    const loading$ = this.store.pipe(
      select(loadingSelector())
    );
    
    let progressBarDialogRef: MatDialogRef<ProgressBarDialogComponent> = null;
    loading$.subscribe((loadingData: LoadingData) => {
      if (loadingData) {
        progressBarDialogRef = this.openProgressBarDialog(loadingData);
      } else if(progressBarDialogRef) {
        progressBarDialogRef.close();
      }
    });
    
    return this.store.pipe(
      select(teamBySlugSelector(teamSlug)),
      tap((team: Team) => {
        if (!team) {
          this.store.dispatch(new RequestOne({ userEmail: user.email, slug: teamSlug }));
        }
      }),
      filter((team: Team) => !!team),
      first()
    );
  }

  openProgressBarDialog(loadingData: LoadingData): MatDialogRef<ProgressBarDialogComponent> {
    const methodTrace = `${this.constructor.name} > openProgressBarDialog() > `; // for debugging
    
    return this.dialog.open(ProgressBarDialogComponent, {
      width: DEFAULT_DIALOG_WIDTH_DESKTOP,
      disableClose: true,
      data: loadingData
    });
  }
  
}
