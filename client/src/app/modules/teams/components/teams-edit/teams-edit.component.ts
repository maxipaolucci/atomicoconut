import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPersonToTeamDialogComponent } from '../../components/add-person-to-team-dialog/add-person-to-team-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../users/models/user';
import { AppService } from '../../../../app.service';
import { Team } from '../../models/team';
import { Subscription, Observable } from 'rxjs';
import { map, combineLatest, withLatestFrom } from 'rxjs/operators';
import _ from 'lodash';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { userSelector } from 'src/app/modules/users/user.selectors';
import { RequestUpdate, UseAndResetLastUpdatedTeamSlug, RequestCreate } from '../../team.actions';
import { TeamEditModel } from '../../models/team-edit-model';
import { teamBySlugSelector, lastUpdatedTeamSlugSelector } from '../../team.selectors';
import { LoadingData } from 'src/app/models/loadingData';
import { loadingSelector } from 'src/app/app.selectors';
import { SetLinks, AppendLink } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';
import { RoutingPaths } from 'src/app/constants';


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
    members : [] //this is a list of member email, not User objects
  };
  slug: string = null;
  subscription: Subscription = new Subscription();
  loading$: Observable<LoadingData>;

  constructor(
      private route: ActivatedRoute,
      private appService: AppService,
      public dialog: MatDialog,
      private store: Store<State>
    ) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Welcome', url: RoutingPaths.WELCOME, selected: false },
      { displayName: 'Teams', url: RoutingPaths.TEAMS, selected: false }
    ]}));

    // get the user (this is fast)
    this.subscription.add(this.store.select(userSelector()).subscribe((user: User) => this.user = user));
    
    this.loading$ = this.store.select(loadingSelector());

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
          this.store.dispatch(new AppendLink({ link: { displayName: 'Create Team', url: '', selected : true }}));
        } else {
          if (!this.slug) {
            this.store.dispatch(new AppendLink({ link: { displayName: 'Edit Team', url: '', selected : true }}));
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

    this.store.dispatch(new RequestCreate({ model: _.cloneDeep(this.model) }));
  }

  onUpdate() {
    const methodTrace = `${this.constructor.name} > onUpdate() > `; // for debugging

    // add slug and members to service payload
    this.model.slug = this.team.slug;
    this.model.members = this.team.members.map((member: User) => member.email);
    // to prevent receiving notification of actions performed by current user
    this.model.pusherSocketID = this.appService.pusherSocketID;
    
    // TODO check the new members are not duplicated, especially the admin
    this.store.dispatch(new RequestUpdate({ originalSlug: this.slug, model: _.cloneDeep(this.model) }));
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
