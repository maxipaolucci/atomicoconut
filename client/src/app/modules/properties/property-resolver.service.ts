import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../users/models/user';
import { State } from '../../main.reducer';
import { Store, select } from '@ngrx/store';
import { Property } from './models/property';
import { userSelector } from '../users/user.selectors';
import { propertyByIdSelector } from './property.selectors';
import { RequestOne } from './property.actions';

@Injectable({
  providedIn: 'root'
})
export class PropertyResolver implements Resolve<Property> {
  private user: User = null;

  constructor(
      private store: Store<State>
  ) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<never> | Observable<Property> {
    const methodTrace = `${this.constructor.name} > resolve() > `; // for debugging  
    
    const propertyId = route.paramMap.get('id');
    this.store.select(userSelector()).subscribe((user: User) => this.user = user); 
    
    return this.store.pipe(
      select(propertyByIdSelector(propertyId)),
      tap((property: Property) => {
        if (!property) {
          this.store.dispatch(new RequestOne({ userEmail: this.user.email, id: propertyId }));
        }
      }),
      first((property: Property) => !!property)
    );
  }
}
