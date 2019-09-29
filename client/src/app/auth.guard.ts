import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './modules/users/users.service';
import { AppState } from './reducers';
import { Store, select } from '@ngrx/store';
import { loggedInSelector } from './modules/users/user.selectors';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router, private store: Store<AppState>) { }
  

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const methodTrace = `${this.constructor.name} > canActivate() > `; // for debugging  
    
    this.usersService.routerRedirectUrl = state.url;
    return this.store.pipe(
      select(loggedInSelector()),
      tap((loggedIn: boolean) => {
        if (!loggedIn) {
          this.router.navigate(['/users/login']);
        }
      })
    );
  }
  
}
