import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { AppService } from '../../../../app.service';
import { Team } from '../../models/team';
import { User } from '../../../users/models/user';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { RequestDelete } from '../../team.actions';
import { ProgressBarDialogComponent } from '../../../shared/components/progress-bar-dialog/progress-bar-dialog.component';
import { RequestAll } from '../../team.actions';
import { teamsSelector, loadingSelector } from '../../team.selectors';
import { LoadingData } from 'src/app/models/loadingData';
import { DEFAULT_DIALOG_WIDTH_DESKTOP, ConsoleNotificationTypes } from 'src/app/constants';
import { userSelector } from 'src/app/modules/users/user.selectors';

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
  bindedToPushNotifications: boolean = false;
  loading$: Observable<LoadingData>;
  progressBarDialogRef: MatDialogRef<ProgressBarDialogComponent> = null;

  constructor(
    private mainNavigatorService: MainNavigatorService, 
    private appService: AppService,
    public dialog: MatDialog,
    private store: Store<State>
  ) {}

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Teams', url: null, selected: true }
    ]);

    //get user
    this.user$ = this.store.select(userSelector());
    this.subscription.add(this.user$.subscribe((user: User) => this.user = user));

    this.store.dispatch(new RequestAll({ userEmail: this.user.email, forceServerRequest: false }));
    this.teams$ = this.store.pipe(
      select(teamsSelector())
    );

    let newSubscription = this.teams$.subscribe((teams: Team[]) => {
      this.teams = teams;
      if (!this.bindedToPushNotifications) {
        this.bindToPushNotificationEvents();
      }
    }, (error: any) => {
      this.teams = [];
    });
    this.subscription.add(newSubscription);

    this.loading$ = this.store.pipe(
      select(loadingSelector())
    );

    newSubscription = this.loading$.subscribe((loadingData: LoadingData) => {
      if (loadingData) {
        this.progressBarDialogRef = this.openProgressBarDialog(loadingData)
      } else if(this.progressBarDialogRef) {
        this.progressBarDialogRef.close();
      }
    });
    this.subscription.add(newSubscription);
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

      this.store.dispatch(new RequestAll({ userEmail: this.user.email, forceServerRequest: true, silently: true }));
    });

    // when a user removes a team
    this.appService.pusherChannel.bind('team-deleted', data => {
      const reloadData = this.teams.some((team : Team) => team.slug == data.team.slug);
      if (!reloadData) {
        return;
      }

      this.store.dispatch(new RequestAll({ userEmail: this.user.email, forceServerRequest: true, silently: true }));
    });

    this.bindedToPushNotifications = true;
  }

  /**
   * Stop listening to Pusher notifications comming from server
   */
  unbindToPushNotificationEvents() {
    this.appService.pusherChannel.unbind('team-deleted');
    this.appService.pusherChannel.unbind('team-updated');
  }

  openProgressBarDialog(loadingData: LoadingData): MatDialogRef<ProgressBarDialogComponent> {
    const methodTrace = `${this.constructor.name} > openProgressBarDialog() > `; // for debugging
    
    return this.dialog.open(ProgressBarDialogComponent, {
      width: DEFAULT_DIALOG_WIDTH_DESKTOP,
      disableClose: true,
      data: loadingData
    });
  }

  openDeleteTeamDialog(index: number, team: Team = null) {
    const methodTrace = `${this.constructor.name} > openDeleteTeamDialog() > `; // for debugging
    
    if (!team) {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Team is required to delete.`);
      return false;
    }

    //this.teamActionRunning[index] = true;
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
      } else {
        //this.teamActionRunning[index] = false;
      }
    });
    this.subscription.add(newSubscription);

    return false;
  }

  delete(index: number, team: Team = null) {
    const methodTrace = `${this.constructor.name} > delete() > `; // for debugging

    this.store.dispatch(new RequestDelete({ userEmail: this.user.email, slug: team.slug }));
  }
}
