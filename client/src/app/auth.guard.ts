import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './modules/users/users.service';
import { User } from './modules/users/models/user';
import { AppService } from './app.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private appService : AppService, private usersService : UsersService, private router : Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    let methodTrace = `${this.constructor.name} > canActivate() > `; //for debugging
    
    this.usersService.routerRedirectUrl = state.url;

    return this.usersService.getAuthenticatedUser().map(
      (data : any) => {
        if (data && data.email) {
          this.usersService.routerRedirectUrl = null; //we don't need this
          return true;
        } else {
          this.appService.consoleLog('info', `${methodTrace} User not logged in.`, data);
          this.router.navigate(['/users/login']);
          return false;
        }
      }, 
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the getAuthenticatedUser service.`, error);
        this.router.navigate(['/users/login']);
        return false;
      }
    );
  }
}
