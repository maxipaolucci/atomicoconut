import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from '../../../users/models/user';
import { TeamsService } from '../../teams.service';
import { AppService } from "../../../../app.service";
import { Team } from '../../models/team';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-teams-dashboard',
  templateUrl: './teams-dashboard.component.html',
  styleUrls: ['./teams-dashboard.component.scss']
})
export class TeamsDashboardComponent implements OnInit {

  user : User = null;
  getTeamsServiceRunning : boolean = false;
  teamActionRunning : boolean[] = [];
  teams : Team[] = [];

  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private teamsService : TeamsService,
    private appService : AppService, private router : Router, public dialog: MatDialog) { }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Teams', url: null, selected: true }
    ]);

    //get authUser from resolver
    this.route.data.subscribe((data: { authUser: User }) => {
      this.user = data.authUser;
    });
    
    if (!this.teams.length) {
      this.getTeams();
    }
  }

  /**
   * Get my teams from server
   */
  getTeams() {
    const methodTrace = `${this.constructor.name} > getTeams() > `; //for debugging

    this.teams = [];
    this.getTeamsServiceRunning = true;

    this.teamsService.getTeams(this.user.email).subscribe(
      (data : any) => {
        if (data && data instanceof Array) {
          let index = 0;
          for (let item of data) {
            let admin = null;
            let members = [];
            for (let member of item.members) {
              const newMember = new User(member.name, member.email, member.gravatar);
              members.push(newMember);
              if (member.isAdmin) {
                admin = newMember;
              }
            }
            this.teams.push(new Team(item.name, item.description || null, item.slug, admin, members));
            this.teamActionRunning[index] = false;
            index += 1;
          }
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }

        this.getTeamsServiceRunning = false;
      },
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.getTeamsServiceRunning = false;
      }
    );
  }

  openDeleteTeamDialog(index : number, team : Team = null) {
    const methodTrace = `${this.constructor.name} > openYesNoDialog() > `; //for debugging
    
    if (!team) {
      this.appService.consoleLog('error', `${methodTrace} Team is required for delete.`);
      return false;
    }

    this.teamActionRunning[index] = true;
    let yesNoDialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '250px',
      data: { message : `Are you sure you want to delete forever the team "${team.name}"`}
    });

    yesNoDialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.delete(index, team);
      } else {
        this.teamActionRunning[index] = false;
      }
    });

    return false;
  }

  delete(index : number, team : Team = null) {
    const methodTrace = `${this.constructor.name} > getTeams() > `; //for debugging

    this.teamActionRunning[index] = true;

    this.teamsService.delete(team.slug, this.user.email).subscribe(
      (data : any) => {
        if (data && data.removed > 0) {
          this.teams.splice(index, 1);
          this.teamActionRunning.splice(index, 1);
          this.appService.showResults(`Team "${team.name}" successfully removed!`, 'success');
        } else {
          this.appService.showResults(`Team "${team.name}" could not be removed, please try again.`, 'error');
        }

        this.teamActionRunning[index] = false;
      },
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.teamActionRunning[index] = false;
      }
    );
  }

}
