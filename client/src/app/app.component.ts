import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { UsersService } from './modules/users/users.service';

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { configuration } from "../../configuration";
import {User} from './modules/users/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'app';
  defaultGravatarUrl = configuration.defaultGravatarUrl;

  constructor(private router : Router, private appService: AppService, private usersService : UsersService) { }

  ngOnInit(): void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging  
  }

  logout() : void {
    let methodTrace = `${this.constructor.name} > logout() > `; //for debugging  
    
    this.usersService.logout().subscribe(
      (data : any) => {
        this.usersService.user = null;
        console.log(123);
        this.router.navigate(['/']);
      },
      (error : any) =>  {
        console.error(`${methodTrace} There was an error with the logout service > ${error}`);
      }
    );
  }


}
