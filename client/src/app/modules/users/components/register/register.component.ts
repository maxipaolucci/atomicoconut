import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../users.service';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private data : any = {};
  constructor(private usersService : UsersService) { }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.usersService.getTest().subscribe(
      (data : any) => {
        this.data = data;
      },
      (error : any) =>  console.error(`${methodTrace} There was an error trying to load Monero prices > ${error}`)
    );
  }

}
