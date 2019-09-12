import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppService } from '../../../../app.service';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { RequestLogin, RequestForgot } from '../../user.actions';
import { LoginModel } from '../../models/login-model';
import { loadingSelector, forgotFormVisibilitySelector } from '../../user.selectors';
import { LoadingData } from 'src/app/models/loadingData';
import { DEFAULT_DIALOG_WIDTH_DESKTOP } from 'src/app/constants';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProgressBarDialogComponent } from 'src/app/modules/shared/components/progress-bar-dialog/progress-bar-dialog.component';


@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  model: LoginModel = { email : '', password : '' };
  forgotModel: any = { email : '' };
  showPassword = false;
  subscription: Subscription = new Subscription();
  progressBarDialogRef: MatDialogRef<ProgressBarDialogComponent> = null;
  forgotFormVisibility: boolean = false;

  constructor(
    private appService: AppService,  
    private mainNavigatorService: MainNavigatorService,  
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging
    
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Login', url: null, selected: true }]);

    this.route.paramMap.pipe(map((params: ParamMap) => params.get('state'))).subscribe(state => {
      if (state === 'reset-password-token-expired') {
        this.appService.showResults('Reset password token has expired or is invalid. Click on "Forgot my password" again to create a new one.', 'error', 10000);
      }
    });

    let newSubscription = this.store.select(loadingSelector()).subscribe((loadingData: LoadingData) => {
      if (loadingData) {
        this.progressBarDialogRef = this.openProgressBarDialog(loadingData)
      } else if(this.progressBarDialogRef) {
        this.progressBarDialogRef.close();
      }
    });
    this.subscription.add(newSubscription);

    newSubscription = this.store.select(forgotFormVisibilitySelector()).subscribe((visibility: boolean) => {
      this.forgotFormVisibility = visibility
    });
    this.subscription.add(newSubscription);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging
    this.store.dispatch(new RequestLogin(this.model));
  }

  openProgressBarDialog(loadingData: LoadingData): MatDialogRef<ProgressBarDialogComponent> {
    const methodTrace = `${this.constructor.name} > openProgressBarDialog() > `; // for debugging
    
    return this.dialog.open(ProgressBarDialogComponent, {
      width: DEFAULT_DIALOG_WIDTH_DESKTOP,
      disableClose: true,
      data: loadingData
    });
  }

  /**
   * When user submits the forgot password form
   */
  onForgotSubmit() { 
    const methodTrace = `${this.constructor.name} > onForgotSubmit() > `; // for debugging

    this.store.dispatch(new RequestForgot(this.forgotModel));
  }

  
}
