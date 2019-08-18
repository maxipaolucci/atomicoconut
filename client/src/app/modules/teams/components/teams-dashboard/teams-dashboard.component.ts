import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from '../../teams.service';
import { AppService } from '../../../../app.service';
import { Team } from '../../models/team';
import { User } from '../../../users/models/user';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';
import { Subscription, Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { LoadTeams } from '../../team.actions';
import { ProgressBarDialogComponent } from 'src/app/modules/shared/components/progress-bar-dialog/progress-bar-dialog.component';
import { Dictionary } from '@ngrx/entity';
import { UsersService } from 'src/app/modules/users/users.service';


@Component({
  selector: 'app-teams-dashboard',
  templateUrl: './teams-dashboard.component.html',
  styleUrls: ['./teams-dashboard.component.scss']
})
export class TeamsDashboardComponent implements OnInit, OnDestroy {

  user: User = null;
  getTeamsServiceRunning = false;
  teamActionRunning: boolean[] = [];
  teams: Team[] = [];
  teams$: Observable<any> = null;
  subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute, 
    private mainNavigatorService: MainNavigatorService, 
    private teamsService: TeamsService,
    private appService: AppService,  
    private usersService: UsersService,  
    public dialog: MatDialog,
    private store: Store<AppState>) {}

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Teams', url: null, selected: true }
    ]);

    this.user = this.usersService.getUser();

    // Create a teams$ observer from the store
    // this.teams$ = this.store.pipe(
    //   select(teamsSelector)
    // );

    // subscribe to any changes in the teams state in the store
    // let newSubscription = this.teams$.subscribe(
    //   (teams: Team[]) => {
    //     this.teams = teams; //heeded for the push notification methids
    //   }
    // );
    // this.subscription.add(newSubscription);

    // get authUser from resolver
    // this.route.data.subscribe((data: { authUser: User }) => {
    //   this.user = data.authUser;
    // });
    this.route.data.subscribe((data: { teams: Team[] }) => {
      console.log(data.teams);
      this.teams$ = of(data.teams);
      this.teams = data.teams;
    });
    // generates a user source object from authUser from resolver
    //const user$ = this.route.data.pipe(map((data: { authUser: User }) => data.authUser));
    // user$.subscribe(
    //   (user: User) => {
    //     this.user = user;
    //     this.getTeams();
    //   }
    // );

    // const newSubscription = user$.pipe(
    //   switchMap((user: User): Observable<Team[]> => {
    //     this.user = user;
    //     return this.getTeams$();
    //   })
    // ).subscribe(
    //   (teams: Team[]) => {
    //     //this.teams = teams;
    //     this.bindToPushNotificationEvents();
    //     this.teamActionRunning = new Array(teams.length).fill(false);
    //     this.getTeamsServiceRunning = false;
    //   },
    //   (error: any) => {
    //     this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
    //     if (error.codeno === 400) {
    //       this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
    //     } else {
    //       this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
    //     }

    //     this.getTeamsServiceRunning = false;
    //   }
    // );
    
    // this.subscription.add(newSubscription);
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
      //console.log(`${methodTrace} current teams: `,this.teams$.getValue());
      let reloadData = this.teams.some((team : Team) => team.slug == data.team.slug);
      if (!reloadData) {
        // if the team is not in my local list check if I am in the list of member of the updated one...
        reloadData = data.team.memberState[this.user.email] ? true : false;
      }

      if (!reloadData) {
        return;
      }

      this.fetchTeamsSilently();
    });

    // when a user removes a team
    this.appService.pusherChannel.bind('team-deleted', data => {
      const reloadData = this.teams.some((team : Team) => team.slug == data.team.slug);
      if (!reloadData) {
        return;
      }

      this.fetchTeamsSilently();
    });
  }

  /**
   * Stop listening to Pusher notifications comming from server
   */
  unbindToPushNotificationEvents() {
    this.appService.pusherChannel.unbind('team-deleted');
    this.appService.pusherChannel.unbind('team-updated');
  }

  /**
   * Refetch silently the teams from the server, and update the team data in the background
   */
  fetchTeamsSilently() {
    this.fetchTeams$();
  }

  /**
   * Make and explicit request for user teams to the server and returns a teams observable
   */
  getTeams$() {
    const methodTrace = `${this.constructor.name} > getTeams$() > `; // for debugging

    this.teams = [];
    this.getTeamsServiceRunning = true;
    
    return this.fetchTeams$();
  }

  /**
   * Get a teams observable from server
   */
  fetchTeams$() {
    const methodTrace = `${this.constructor.name} > fetchTeams$() > `; // for debugging

    return this.teamsService.getTeams$(this.user.email)
      .pipe(
        tap((teams : Team[]) => {
          this.store.dispatch(new LoadTeams({ teams }));
        })
      );
  }

  openProgressBarDialog() {
    const methodTrace = `${this.constructor.name} > openProgressBarDialog() > `; // for debugging
    
    const progressBarDialogRef = this.dialog.open(ProgressBarDialogComponent, {
      width: '250px',
      disableClose: true,
      data: {
        color : 'primary', 
        message : `Loading teams...`,
        extraClasses: 'pepe-class' 
      }
    });

    return false;
  }

  openDeleteTeamDialog(index: number, team: Team = null) {
    const methodTrace = `${this.constructor.name} > openDeleteTeamDialog() > `; // for debugging
    
    if (!team) {
      this.appService.consoleLog('error', `${methodTrace} Team is required to delete.`);
      return false;
    }

    this.teamActionRunning[index] = true;
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
        this.teamActionRunning[index] = false;
      }
    });
    this.subscription.add(newSubscription);

    return false;
  }

  delete(index: number, team: Team = null) {
    const methodTrace = `${this.constructor.name} > delete() > `; // for debugging

    this.teamActionRunning[index] = true;

    const newSubscription = this.teamsService.delete$(team.slug, this.user.email).subscribe(
      (data: any) => {
        if (data && data.removed > 0) {
          this.teams.splice(index, 1);
          this.teamActionRunning.splice(index, 1);
          this.appService.showResults(`Team "${team.name}" successfully removed!`, 'success');
        } else {
          this.appService.showResults(`Team "${team.name}" could not be removed, please try again.`, 'error');
        }

        this.teamActionRunning[index] = false;
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else if (error.codeno === 471) {
          this.appService.showResults(error.msg, 'error', 7000);
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.teamActionRunning[index] = false;
      }
    );

    this.subscription.add(newSubscription);
  }

}
