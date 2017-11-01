import { Component, OnInit } from '@angular/core';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from '../../../users/models/user';
import { TeamsService } from '../../teams.service';
import { AppService } from "../../../../app.service";
import { Team } from '../../models/team';

@Component({
  selector: 'app-teams-dashboard',
  templateUrl: './teams-dashboard.component.html',
  styleUrls: ['./teams-dashboard.component.scss']
})
export class TeamsDashboardComponent implements OnInit {

  user : User = null;
  getTeamsServiceRunning : boolean = false;
  teams : Team[] = [];

  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private teamsService : TeamsService,
    private appService : AppService, private router : Router) { }

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
    
    this.getTeams();
  }

  /**
   * Get my teams from server
   */
  getTeams() {
    const methodTrace = `${this.constructor.name} > getTeams() > `; //for debugging

    this.getTeamsServiceRunning = true;

    this.teamsService.getTeams(this.user.email).subscribe(
      (data : any) => {
        if (data && data.length) {
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
          }
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }

        this.getTeamsServiceRunning = false;
      },
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the get team service.`, error);
        if (error.codeno === 400) {
          //the mail system failed for external reasons
          this.appService.showResults(`There was an error with the team services, please try again in a few minutes.`);
        }

        this.getTeamsServiceRunning = false;
      }
    );
  }

}
