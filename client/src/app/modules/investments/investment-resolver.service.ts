import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../users/models/user';
import { State } from '../../main.reducer';
import { Store, select } from '@ngrx/store';
import { Investment } from './models/investment';
import { userSelector } from '../users/user.selectors';
import { investmentByIdSelector } from './investment.selectors';
import { RequestOne } from './investment.actions';

@Injectable({
  providedIn: 'root'
})
export class InvestmentResolver implements Resolve<Investment> {
  private user: User = null;

  constructor(
      private store: Store<State>
  ) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<never> | Observable<Investment> {
    const methodTrace = `${this.constructor.name} > resolve() > `; // for debugging  
    
    const investmentId = route.paramMap.get('id');
    this.store.select(userSelector()).subscribe((user: User) => this.user = user); 
    
    return this.store.pipe(
      select(investmentByIdSelector(investmentId)),
      tap((investment: Investment) => {
        if (!investment) {
          this.store.dispatch(new RequestOne({ id: investmentId }));
        }
      }),
      first((investment: Investment) => !!investment)
    );
  }
}
