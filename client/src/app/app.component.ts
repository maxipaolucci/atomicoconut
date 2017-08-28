import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { UsersService } from './modules/users/users.service';

import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'app';

  constructor(private appService: AppService, private usersService : UsersService) { }

  ngOnInit(): void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging  
    
    this.usersService.getAuthenticatedUser().subscribe(
      (data : any) => {
        if (data && data.email) {
          console.log(data);
        } else {
          console.info(`${methodTrace} User not logged in.`)
        }
      },
      (error : any) =>  console.error(`${methodTrace} There was an error with the register service > ${error}`)
    );
  }


}
