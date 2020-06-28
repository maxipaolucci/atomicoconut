import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { State } from './main.reducer';
import { Store, select } from '@ngrx/store';
import { loggedInSelector } from './modules/users/user.selectors';
import { tap } from 'rxjs/operators';
import { SetRedirectUrl } from './app.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store<State>) { }
  

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const methodTrace = `${this.constructor.name} > canActivate() > `; // for debugging  
    
    return this.store.pipe(
      select(loggedInSelector()),
      tap((loggedIn: boolean) => {
        if (!loggedIn) {
          this.store.dispatch(new SetRedirectUrl({ url: state.url }));
          this.router.navigate(['/users/login']);
        }
      })
    );
  }
  
}
