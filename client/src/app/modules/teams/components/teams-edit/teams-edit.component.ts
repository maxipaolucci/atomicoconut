import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { AddPersonToTeamDialogComponent } from '../../components/add-person-to-team-dialog/add-person-to-team-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../users/models/user';
import { AppService } from '../../../../app.service';
import { Team } from '../../models/team';
import { Subscription } from 'rxjs';
import { map, combineLatest, withLatestFrom } from 'rxjs/operators';
import _ from 'lodash';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { userSelector } from 'src/app/modules/users/user.selectors';
import { RequestUpdate, UseAndResetLastUpdatedTeamSlug, RequestCreate } from '../../team.actions';
import { TeamEditModel } from '../../models/team-edit-model';
import { teamBySlugSelector, lastUpdatedTeamSlugSelector } from '../../team.selectors';

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: ['./teams-edit.component.scss']
})
export class TeamsEditComponent implements OnInit, OnDestroy {

  editMode = false;
  user: User = null;
  team: Team = null;
  editTeamServiceRunning = false;
  getTeamServiceRunning = false;
  model: TeamEditModel = {
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
      private appService: AppService,
      public dialog: MatDialog,
      private store: Store<State>
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

    let newSubscription = this.store
      .pipe(
        select(teamBySlugSelector(this.route.snapshot.params.slug)), // this is undefined when the user updates the team name. When save to db, it comes back with a different slug
        combineLatest(this.route.data.pipe(map((data: { team: Team }) => data.team)), (teamBySlug, teamFromResolver) => {
          if (!teamBySlug && teamFromResolver) {
            // this could happend when updating the team name.
            return teamFromResolver;
          } else if (teamBySlug) {
            return teamBySlug;
          } 

          return null;
        }),
        withLatestFrom(this.store.select(lastUpdatedTeamSlugSelector()))
      ).subscribe(([team, lastUpdatedTeamSlug]) => {
        if (lastUpdatedTeamSlug) {
          // this means the user updated the team.name to a different one, then the store was updated and the team with the old id/slug move in the 
          return this.store.dispatch(new UseAndResetLastUpdatedTeamSlug({ lastUpdatedTeamSlug }));
        }
        
        this.team = _.cloneDeep(team); //need a non inmutable copy
        if (!team && !this.slug) {
          // we are creating a new team
          this.slug = null;
          this.editMode = false;
          this.mainNavigatorService.appendLink({ displayName: 'Create Team', url: '', selected : true });
        } else {
          if (!this.slug) {
            this.mainNavigatorService.appendLink({ displayName: 'Edit Team', url: '', selected : true });
          }
          
          // we are editing an existing investment
          this.editMode = true;
          
          // populate the model
          this.slug = team.slug; // the new slug
          this.model.name = team.name;
          this.model.description = team.description;
        }
      });

    this.subscription.add(newSubscription);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging

    const model = _.cloneDeep(this.model); //for some reason this get readonly state too affter using it for the requestupdate action
    this.store.dispatch(new RequestCreate({ model }));
  }

  onUpdate() {
    const methodTrace = `${this.constructor.name} > onUpdate() > `; // for debugging

    // add slug and members to service payload
    this.model.slug = this.team.slug;
    this.model.members = this.team.members.map((member: User) => member.email);
    //to prevent receiving notification of actions performed by current user
    this.model.pusherSocketID = this.appService.pusherSocketID;
    const model = _.cloneDeep(this.model); //for some reason this get readonly state too affter using it for the requestupdate action
    // TODO check the new members are not duplicated, especially the admin
    this.store.dispatch(new RequestUpdate({ originalSlug: this.slug, model }));
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
