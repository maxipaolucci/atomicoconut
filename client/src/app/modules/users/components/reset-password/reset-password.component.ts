import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { map } from 'rxjs/operators';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs';
import { ResetPasswordModel } from '../../models/reset-password-model';
import { LoadingData } from 'src/app/models/loadingData';
import { DEFAULT_DIALOG_WIDTH_DESKTOP, SnackbarNotificationTypes, ConsoleNotificationTypes } from 'src/app/constants';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProgressBarDialogComponent } from 'src/app/modules/shared/components/progress-bar-dialog/progress-bar-dialog.component';
import { State } from 'src/app/main.reducer';
import { Store } from '@ngrx/store';
import { loadingSelector } from '../../user.selectors';
import { RequestReset } from '../../user.actions';


@Component({
  selector: 'users-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  model: ResetPasswordModel = { password : '', 'password-confirm' : ''};
  private token = '';
  showPassword = false;
  subscription: Subscription = new Subscription();
  progressBarDialogRef: MatDialogRef<ProgressBarDialogComponent> = null;

  constructor(
    private appService: AppService, 
    private router: Router, 
    private route: ActivatedRoute,
    private mainNavigatorService: MainNavigatorService,
    public dialog: MatDialog,
    private store: Store<State>
  ) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging
    
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Login', url: '/users/login', selected: false },
      { displayName: 'Reset password', url: null, selected: true }]);

    this.route.paramMap.pipe(map((params: ParamMap) => params.get('token')))
      .subscribe(token => { 
        if (token) {
          this.token = token;
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Token must be set to reset a password.`);
          this.router.navigate(['/']);
        }
      });

    let newSubscription = this.store.select(loadingSelector())
      .subscribe((loadingData: LoadingData) => {
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

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  openProgressBarDialog(loadingData: LoadingData): MatDialogRef<ProgressBarDialogComponent> {
    const methodTrace = `${this.constructor.name} > openProgressBarDialog() > `; // for debugging
    
    return this.dialog.open(ProgressBarDialogComponent, {
      width: DEFAULT_DIALOG_WIDTH_DESKTOP,
      disableClose: true,
      data: loadingData
    });
  }

  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging

    // chech that the password and the confirmed password are the same
    if (this.model.password !== this.model['password-confirm']) {
      this.appService.showResults(`Confirm password must match password.`, SnackbarNotificationTypes.ERROR);
      return false;
    }

    this.store.dispatch(new RequestReset({ token: this.token, model: this.model }));
  }

}
