import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../../../app.service';
import { Team } from '../../models/team';
import { User } from '../../../users/models/user';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';
import { Subscription, Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { RequestDelete } from '../../team.actions';
import { RequestAll } from '../../team.actions';
import { teamsSelector } from '../../team.selectors';
import { LoadingData } from 'src/app/models/loadingData';
import { ConsoleNotificationTypes, RoutingPaths } from 'src/app/constants';
import { userSelector } from 'src/app/modules/users/user.selectors';
import { loadingSelector } from 'src/app/app.selectors';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';

@Component({
  selector: 'app-teams-dashboard',
  templateUrl: './teams-dashboard.component.html',
  styleUrls: ['./teams-dashboard.component.scss']
})
export class TeamsDashboardComponent implements OnInit, OnDestroy {

  user$: Observable<User> = null;
  user: User = null;
  teams: Team[] = [];
  teams$: Observable<any> = null;
  subscription: Subscription = new Subscription();
  loading$: Observable<LoadingData>;
  
  constructor(
    private appService: AppService,
    private store: Store<State>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Welcome', url: RoutingPaths.WELCOME, selected: false },
      { displayName: 'Teams', url: null, selected: true }
    ]}));

    //get user
    this.user$ = this.store.select(userSelector());
    this.subscription.add(this.user$.subscribe((user: User) => this.user = user));

    this.store.dispatch(new RequestAll({ forceServerRequest: false }));
    this.teams$ = this.store.select(teamsSelector());
    let newSubscription = this.teams$.pipe(
      switchMap((teams: Team[]) => {
        this.teams = teams;
        return this.appService.pusherReady$.pipe(
          first((ready: boolean) => ready == true) // when pusher is ready then bind and stop listening to this
        );
      })
    ).subscribe((ready: boolean) => this.bindToPushNotificationEvents());
    this.subscription.add(newSubscription);

    this.loading$ = this.store.select(loadingSelector());
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    this.subscription.unsubscribe();
    this.unbindToPushNotificationEvents();
  }

  /**
   * Start listening to Pusher notifications comming from server
   */
  bindToPushNotificationEvents() {
    const methodTrace = `${this.constructor.name} > bindToPushNotificationEvents$() > `; // for debugging
    // when a user updates a team
    this.appService.pusherChannel.bind('team-updated', data => {
      let reloadData = this.teams.some((team : Team) => team.slug == data.team.slug);
      if (!reloadData) {
        // if the team is not in my local list check if I am in the list of member of the updated one...
        reloadData = data.team.memberState[this.user.email] ? true : false;
      }

      if (!reloadData) {
        return;
      }

      this.store.dispatch(new RequestAll({ forceServerRequest: true, silently: true }));
    });

    // when a user removes a team
    this.appService.pusherChannel.bind('team-deleted', data => {
      const reloadData = this.teams.some((team : Team) => team.slug == data.team.slug);
      if (!reloadData) {
        return;
      }

      this.store.dispatch(new RequestAll({ forceServerRequest: true, silently: true }));
    });
  }

  /**
   * Stop listening to Pusher notifications comming from server
   */
  unbindToPushNotificationEvents() {
    if (this.appService.pusherChannel) {
      this.appService.pusherChannel.unbind('team-deleted');
      this.appService.pusherChannel.unbind('team-updated');
    }
  }

  openDeleteTeamDialog(index: number, team: Team = null) {
    const methodTrace = `${this.constructor.name} > openDeleteTeamDialog() > `; // for debugging
    
    if (!team) {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Team is required to delete.`);
      return false;
    }

    const yesNoDialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '250px',
      data: {
        title : 'Delete team', 
        message : `Are you sure you want to delete the team "${team.name}" forever?`
      }
    });

    const newSubscription = yesNoDialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.delete(index, team);
      }
    });
    this.subscription.add(newSubscription);

    return false;
  }

  delete(index: number, team: Team = null) {
    const methodTrace = `${this.constructor.name} > delete() > `; // for debugging

    this.store.dispatch(new RequestDelete({ slug: team.slug }));
  }
}
