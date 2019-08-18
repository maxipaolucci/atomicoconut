import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './modules/users/users.service';
import { User } from './modules/users/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) { }
  

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const methodTrace = `${this.constructor.name} > canActivate() > `; // for debugging  
    
    this.usersService.routerRedirectUrl = state.url;
    const user: User = this.usersService.getUser();
    if (user) {
      this.usersService.routerRedirectUrl = null;
      return true;
    }

    this.router.navigate(['/users/login']);
    return false;
  }
  
}
