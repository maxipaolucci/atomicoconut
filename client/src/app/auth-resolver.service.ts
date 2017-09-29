import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from './modules/users/user';
import { UsersService } from './modules/users/users.service';

@Injectable()
export class AuthResolver implements Resolve<User> {
  constructor(private usersService : UsersService, private router : Router) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    let methodTrace = `${this.constructor.name} > resolve() > `; //for debugging  
    
    return this.usersService.getAuthenticatedUser().map(
      (data : any) => {
        if (data && data.email) {
          const user : User = new User(data.name, data.email, data.avatar);          
          this.usersService.user = user;
          return user;
        } else {
          console.info(`${methodTrace} User not logged in.`);
          this.usersService.user = null;
          this.router.navigate(['/users/login']);
          return null;
        }
      }, 
      (error : any) => {
        console.error(`${methodTrace} There was an error with the getAuthenticatedUser service > ${error}`);
        this.usersService.user = null;
        this.router.navigate(['/users/login']);
        return null;
      }
    );
  }
  
}
