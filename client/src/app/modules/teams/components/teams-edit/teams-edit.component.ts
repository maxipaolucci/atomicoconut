import { Component, OnInit } from '@angular/core';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from '../../../users/models/user';
import { TeamsService } from '../../teams.service';
import { AppService } from "../../../../app.service";

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: ['./teams-edit.component.scss']
})
export class TeamsEditComponent implements OnInit {

  user : User = null;
  editTeamServiceRunning : boolean = false;
  model : any = {
    name : null,
    description : null,
    email : null //user email for api check
  };

  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private teamsService : TeamsService,
      private appService : AppService) { }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Teams', url: '/teams', selected: false }
    ]);

    this.route.paramMap.map((params: ParamMap) => params.get('id'))
      .subscribe(id => { 
        if (!id) {
          this.mainNavigatorService.appendLink({ displayName: 'Create Team', url: '', selected : true });
        } else {
          this.mainNavigatorService.appendLink({ displayName: 'Edit Team', url: '', selected : true });
        }
      });

    //get authUser from resolver
    this.route.data.subscribe((data: { authUser: User }) => {
      this.user = data.authUser;
      this.model.email = this.user.email;
    });
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    this.editTeamServiceRunning = true;
    //call the account service
    this.teamsService.create(this.model).subscribe(
      (data : any) => {
        if (data && data.id) {
          this.appService.showResults(`Team ${data.name} successfully updated!.`);
          //redirect to team edit route
        } else {
          console.error(`${methodTrace} Unexpected data format.`)
          this.editTeamServiceRunning = false;
        }
      },
      (error : any) => {
        console.error(`${methodTrace} There was an error with the create/edit team service > ${error}`);
        if (error.codeno === 400) {
          //the mail system failed for external reasons
          this.appService.showResults(`There was an error with the team services, please try again in a few minutes.`);
        }

        this.editTeamServiceRunning = false;
      }
    );
  }
}
