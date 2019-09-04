import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { AddPersonToTeamDialogComponent } from '../../components/add-person-to-team-dialog/add-person-to-team-dialog.component';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from '../../../users/models/user';
import { TeamsService } from '../../teams.service';
import { AppService } from '../../../../app.service';
import { Team } from '../../models/team';
import { Subscription, of, Observable } from 'rxjs';
import { map, combineLatest, switchMap } from 'rxjs/operators';
import { UsersService } from '../../../../modules/users/users.service';
import _ from 'lodash';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { userSelector } from 'src/app/modules/users/user.selectors';

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: ['./teams-edit.component.scss']
})
export class TeamsEditComponent implements OnInit, OnDestroy {

  editMode = false;
  user: User = null;
  team: Team = null;
  team$: Observable<Team> = null;
  editTeamServiceRunning = false;
  getTeamServiceRunning = false;
  model: any = {
    name : null,
    description : null,
    email : null, // user email for api check
    members : [] //this is a list of member email, not User objects
  };
  slug: string = null;
  subscription: Subscription = new Subscription();

  constructor(
      private route: ActivatedRoute, 
      private mainNavigatorService: MainNavigatorService, 
      private teamsService: TeamsService,
      private appService: AppService,
      private usersService: UsersService, 
      private router: Router, 
      public dialog: MatDialog,
      private store: Store<AppState>
    ) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Teams', url: '/teams', selected: false }
    ]);

    this.subscription.add(this.store.select(userSelector()).subscribe((user: User) => {
      this.user = user;
      this.model.email = user.email;
    }));

    //from resolver
    this.team$ = this.route.data.pipe(
      map((data: { team: Team }) => data.team)
    );

    let newSubscription = this.team$.subscribe(
      (team: Team) => {
        this.team = _.cloneDeep(team); //need a non inmutable copy
        
        if (!team) {
          // we are creating a new team
          this.slug = null;
          this.editMode = false;
          this.mainNavigatorService.appendLink({ displayName: 'Create Team', url: '', selected : true });
        } else {
          if (this.slug) {
            console.log('esto pasoooooo??? q significa')
            // if this is true means the user updated the name and we refresh the page to update the slug in the url
            // in this case we don't want to append the edit team link to the navigation component because it is already there.
          } else {
            this.mainNavigatorService.appendLink({ displayName: 'Edit Team', url: '', selected : true });
          }
          // we are editing an existing investment
          this.editMode = true;
          
          // populate the model
          this.slug = team.slug; // the new slug
          this.model.name = team.name;
          this.model.description = team.description;  
        }
      }
    );

    // // generates a user source object from authUser from resolver
    // const user$ = this.route.data.pipe(map((data: { authUser: User }) => data.authUser));
    
    // // generates an investment id source from id parameter in url
    // const slug$ = this.route.paramMap.pipe(map((params: ParamMap) => params.get('slug')));

    // // combine user$ and id$ sources into one object and start listen to it for changes
    // newSubscription = user$.pipe(
    //   combineLatest(slug$, (user, slug) => { 
    //     return { user, teamSlug : slug }; 
    //   }), 
    //   switchMap((data: any) => {
    //     this.user = data.user;
    //     this.model.email = data.user.email;

    //     this.editTeamServiceRunning = false;
    //     this.getTeamServiceRunning = false;
        
    //     if (!data.teamSlug) {
    //       // we are creating a new team
    //       this.slug = null;
    //       this.editMode = false;
    //       this.mainNavigatorService.appendLink({ displayName: 'Create Team', url: '', selected : true });
    //       return of(null);
    //     } else {
    //       if (this.slug) {
    //         // if this is true means the user updated the name and we refresh the page to update the slug in the url
    //         // in this case we don't want to append the edit team link to the navigation component because it is already there.
    //       } else {
    //         this.mainNavigatorService.appendLink({ displayName: 'Edit Team', url: '', selected : true });
    //       }
    //       // we are editing an existing investment
    //       this.slug = data.teamSlug; // the new slug
    //       this.editMode = true;
          
    //       return this.getTeam$(data.teamSlug); // get data
    //     }
    //   })
    // ).subscribe((team: Team) => {
    //   if (team) {
    //     // we are editing a team
    //     this.team = team;
    //     // populate the model
    //     this.model.name = this.team.name;
    //     this.model.description = this.team.description;  
    //   } else {
    //     // we are creating a team, do nothing
    //   }
      
    //   this.getTeamServiceRunning = false;
    // },
    // (error: any) => {
    //   this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
    //   if (error.codeno === 400) {
    //     this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
    //   } else if (error.codeno === 461 || error.codeno === 462) {
    //     this.appService.showResults(error.msg, 'error');
    //     this.router.navigate(['/welcome']);
    //   } else {
    //     this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
    //   }

    //   this.getTeamServiceRunning = false;
    // });
    this.subscription.add(newSubscription);
  }

  // /**
  //  * Get a team observable from server based on the slug provided
  //  * @param {string} slug 
  //  * 
  //  * @return {Observable<Team>} teams source
  //  */
  // getTeam$(slug: string): Observable<Team> {
  //   const methodTrace = `${this.constructor.name} > getTeam$() > `; // for debugging

  //   if (!slug) {
  //     this.appService.showResults(`Invalid team ID`, 'error');
  //     this.appService.consoleLog('error', `${methodTrace} Slug parameter must be provided, but was: `, slug);
  //     return of(null);
  //   }

  //   this.getTeamServiceRunning = true;

  //   return this.teamsService.getMyTeamBySlug$(this.user.email, slug);
  // }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging

    this.editTeamServiceRunning = true;
    // call the team create service
    const newSubscription = this.teamsService.create$(this.model).subscribe(
      (newTeam: Team) => {
        if (newTeam && newTeam.slug) {
          this.appService.showResults(`Team ${newTeam.name} successfully created!`, 'success');
          this.router.navigate(['/teams/edit', newTeam.slug]);
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
          this.editTeamServiceRunning = false;
        }
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the create/edit team service.`, error);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error with the team services, please try again in a few minutes.`, 'error');
        }

        this.editTeamServiceRunning = false;
      }
    );

    this.subscription.add(newSubscription);
  }

  onUpdate() {
    const methodTrace = `${this.constructor.name} > onUpdate() > `; // for debugging
    
    this.editTeamServiceRunning = true;

    // add slug and members to service payload
    this.model.slug = this.slug;
    this.model.members = []; // reset the members array
    for (const member of this.team.members) {
      this.model.members.push(member.email);
    }

    // TODO check the new members are not duplicated, especially the admin

    // call the team update service
    const newSubscription = this.teamsService.update$(this.model).subscribe(
      (team: Team) => {
          
        if (this.slug !== team.slug) {
          // this means that the team name was update and therefore the slug too
          this.router.navigate(['/teams/edit', team.slug]); // go home 
        } else {
          // create team
          this.team = team;
          // populate the model
          this.model.name = this.team.name;
          this.model.description = this.team.description;
          this.editTeamServiceRunning = false;  
        }
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.editTeamServiceRunning = false;
      }
    );

    this.subscription.add(newSubscription);
  }

  openAddPersonDialog() {
    const addPersonDialogRef = this.dialog.open(AddPersonToTeamDialogComponent, {
      width: '250px',
      data: {}
    });

    const newSubscription = addPersonDialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newMember = new User('', result);
        this.team.members.push(newMember);
      }
    });

    this.subscription.add(newSubscription);

    return false;
  }

  removeMember(index: number) {
    this.team.members.splice(index, 1);
  }
}
