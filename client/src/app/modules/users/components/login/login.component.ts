import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import {User} from '../../models/user';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { RequestLogin } from '../../user.actions';
import { LoginModel } from '../../models/login-model';
import { userSelector, loadingSelector } from '../../user.selectors';
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
  forgotModel: any = { email : '', forgot : false };
  loginServiceRunning = false;
  forgotServiceRunning = false;
  showPassword = false;
  subscription: Subscription = new Subscription();
  progressBarDialogRef: MatDialogRef<ProgressBarDialogComponent> = null;

  constructor(
    private usersService: UsersService, 
    private appService: AppService,  
    private mainNavigatorService: MainNavigatorService, 
    private router: Router, 
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

    // const user$ = this.store.pipe(
    //   select(userSelector())
    // );
    // let newSubscription: Subscription = user$.subscribe((user: User) => {
    //   if (user) {
    //     const redirectUrl = this.usersService.routerRedirectUrl ? this.usersService.routerRedirectUrl : '/';
    //     this.usersService.routerRedirectUrl = null;
    //     this.router.navigate([redirectUrl]);
    //   }
    // });
    // this.subscription.add(newSubscription);

    const loading$ = this.store.pipe(
      select(loadingSelector())
    );

    let newSubscription = loading$.subscribe((loadingData: LoadingData) => {
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
   * When user submits the login form
   */
  onSubmitOld() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging

    this.loginServiceRunning = true;
    
    // call the register service
    const newSubscription: Subscription = this.usersService.login$(this.model).subscribe(
      (user: User) => {
        if (user) {
          const redirectUrl = this.usersService.routerRedirectUrl ? this.usersService.routerRedirectUrl : '/';
          this.usersService.routerRedirectUrl = null;
          this.router.navigate([redirectUrl]);
        }

        this.loginServiceRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else if (error.codeno === 451) {
          this.appService.showResults(error.msg, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.loginServiceRunning = false;
      }
    );
    this.subscription.add(newSubscription);
  }

  /**
   * When user submits the forgot password form
   */
  onForgotSubmit() { 
    const methodTrace = `${this.constructor.name} > onForgotSubmit() > `; // for debugging

    this.forgotServiceRunning = true;
    // call the register service
    const newSubscription: Subscription = this.usersService.forgot$(this.forgotModel).subscribe(
      (data: any) => {
        if (data && data.email && data.expires) {
          this.appService.showResults(`We sent an email to ${data.email} with a password reset link that will expire in ${data.expires}.`, 'info');
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }
        
        this.forgotServiceRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else if (error.codeno === 455) {
          // invalid email
          this.appService.showResults(error.msg, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }
        this.forgotServiceRunning = false;
      }
    );
    this.subscription.add(newSubscription);
  }

  
}
