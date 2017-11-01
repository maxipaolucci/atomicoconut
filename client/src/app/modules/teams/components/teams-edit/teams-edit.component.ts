import { Component, OnInit } from '@angular/core';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from '../../../users/models/user';
import { TeamsService } from '../../teams.service';
import { AppService } from "../../../../app.service";
import { Team } from '../../models/team';

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: ['./teams-edit.component.scss']
})
export class TeamsEditComponent implements OnInit {

  user : User = null;
  team : Team = null;
  editTeamServiceRunning : boolean = false;
  getTeamServiceRunning : boolean = false;
  model : any = {
    name : null,
    description : null,
    email : null //user email for api check
  };

  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private teamsService : TeamsService,
      private appService : AppService, private router : Router) { }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Teams', url: '/teams', selected: false }
    ]);

    //get authUser from resolver
    this.route.data.subscribe((data: { authUser: User }) => {
      this.user = data.authUser;
      this.model.email = this.user.email;
    });

    this.route.paramMap.map((params: ParamMap) => params.get('slug'))
      .subscribe(slug => { 
        if (!slug) {
          //we are creating a team
          this.mainNavigatorService.appendLink({ displayName: 'Create Team', url: '', selected : true });
        } else {
          //we are editing a team
          this.mainNavigatorService.appendLink({ displayName: 'Edit Team', url: '', selected : true });

          this.getTeam(slug);
        }
      });
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    this.editTeamServiceRunning = true;
    //call the account service
    this.teamsService.create(this.model).subscribe(
      (data : any) => {
        if (data && data.slug) {
          this.appService.showResults(`Team ${data.name} successfully created!`);
          this.router.navigate(['/teams/edit', data.slug]);
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
          this.editTeamServiceRunning = false;
        }
      },
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the create/edit team service.`, error);
        if (error.codeno === 400) {
          //the mail system failed for external reasons
          this.appService.showResults(`There was an error with the team services, please try again in a few minutes.`);
        }

        this.editTeamServiceRunning = false;
      }
    );
  }

  /**
   * Get a team from server based on the slug provided
   * @param {string} slug 
   */
  getTeam(slug : string) {
    const methodTrace = `${this.constructor.name} > getTeam() > `; //for debugging

    if (!slug) {
      this.appService.consoleLog('error', `${methodTrace} Slug parameter must be provided, but was: `, slug);
      return false;
    }

    this.getTeamServiceRunning = true;

    this.teamsService.getTeamBySlug(this.user.email, slug).subscribe(
      (data : any) => {
        if (data && data.slug) {
          const admin = new User(data.admin.name, data.admin.email, data.admin.gravatar);
          let members = [];
          for (let member of data.members) {
            const newMember = new User(member.name, member.email, member.gravatar);
            members.push(newMember);
          }

          this.team = new Team(data.name, data.description || null, data.slug, admin, members);
          console.log(this.team);
          this.model.name = this.team.name;
          this.model.description = this.team.description;
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }

        this.getTeamServiceRunning = false;
      },
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the get team service.`, error);
        if (error.codeno === 400) {
          //the mail system failed for external reasons
          this.appService.showResults(`There was an error with the team services, please try again in a few minutes.`);
        }

        this.getTeamServiceRunning = false;
      }
    );
  }
}
