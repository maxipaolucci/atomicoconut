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
  private postSubmitErrors : string[];
  
  constructor(private registerFormQuestionService: RegisterFormQuestionService, private usersService : UsersService) {
    this.postSubmitErrors = [];
  }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    this.questions = this.registerFormQuestionService.getQuestions();
    this.usersService.getTest().subscribe(
      (data : any) => {
        this.data = data;
      },
      (error : any) =>  console.error(`${methodTrace} There was an error trying to load Monero prices > ${error}`)
    );
  }

  onFormSubmitHandler(formData : any) {
    const methodTrace = `${this.constructor.name} > onFormSubmitHandler() > `; //for debugging
    
    //chech that the password and the confirmed password are the same
    if (formData['password'] !== formData['password-confirm']) {
      this.postSubmitErrors.push('The confirm password field must match the password');
      return false;
    }
    
    //call the register service
    this.usersService.register(formData).subscribe(
      (data : any) => {
        console.log(data) 
      },
      (error : any) =>  console.error(`${methodTrace} There was an error with the register service > ${error}`)
    );
  }

}
