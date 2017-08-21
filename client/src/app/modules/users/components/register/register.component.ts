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
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    this.questions = this.registerFormQuestionService.getQuestions();
    console.log(this.questions);
    this.usersService.getTest().subscribe(
      (data : any) => {
        this.data = data;
      },
      (error : any) =>  console.error(`${methodTrace} There was an error trying to load Monero prices > ${error}`)
    );
  }

  onFormSubmitHandler(formData : any) {
    console.log(formData);
    const methodTrace = `${this.constructor.name} > onFormSubmitHandler() > `; //for debugging
    this.usersService.register(formData).subscribe(
      (data : any) => {
        console.log(data) 
      },
      (error : any) =>  console.error(`${methodTrace} There was an error with the register service > ${error}`)
    );
  }

}
