import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../users.service';
import { RegisterFormQuestionService } from './register-form-question.service';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers : [ RegisterFormQuestionService ]
})
export class RegisterComponent implements OnInit {
  private data : any = {};
  private questions: any[];
  
  constructor(private registerFormQuestionService: RegisterFormQuestionService, 
      private usersService : UsersService) { }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    this.questions = this.registerFormQuestionService.getQuestions();
    console.log(this.questions);
    this.usersService.getTest().subscribe(
      (data : any) => {
        this.data = data;
      },
      (error : any) =>  console.error(`${methodTrace} There was an error trying to load Monero prices > ${error}`)
    );
  }

}
