import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from '../../teams.service';
import { AppService } from '../../../../app.service';
import { Team } from '../../models/team';
import { User } from '../../../users/models/user';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';
import { Subscription, Observable, of } from 'rxjs';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { map, switchMap } from 'rxjs/operators';

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
  subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private mainNavigatorService: MainNavigatorService, private teamsService: TeamsService,
    private appService: AppService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging
    
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Teams', url: null, selected: true }
    ]);

    // get authUser from resolver
    this.route.data.subscribe((data: { authUser: User }) => {
      this.user = data.authUser;
    });
    // generates a user source object from authUser from resolver
    const user$ = this.route.data.pipe(map((data: { authUser: User }) => data.authUser));
    const newSubscription = user$.pipe(
      switchMap((user: User): Observable<any> => {
        this.user = user;
        this.bindToPushNotificationEvents();

        if (!this.teams.length) {
          return this.getTeams$();
        } else {
          return of(this.teams);
        }
      })
    ).subscribe(
      (teams: Team[]) => {
        this.teams = teams;
        this.teamActionRunning = new Array(teams.length).fill(false);
        this.getTeamsServiceRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.getTeamsServiceRunning = false;
      }
    );
    
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
    const newSubscription = this.fetchTeams$().subscribe((teams : Team[]) => this.teams = teams);
    this.subscription.add(newSubscription);
  }

  /**
   * Make and explicit request for user teams to the server and returns a teams observable
   * 
   * @return { Observable<Team[]> }
   */
  getTeams$(): Observable<Team[]> {
    const methodTrace = `${this.constructor.name} > getTeams$() > `; // for debugging

    this.teams = [];
    this.getTeamsServiceRunning = true;

    return  this.fetchTeams$();
  }

  /**
   * Get a teams observable from server
   * 
   * @return { Observable<Team[]> }
   */
  fetchTeams$(): Observable<Team[]> {
    const methodTrace = `${this.constructor.name} > fetchTeams$() > `; // for debugging

    return  this.teamsService.getTeams$(this.user.email);
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
