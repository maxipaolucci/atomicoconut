import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module'; 
import { RegisterComponent } from './components/register/register.component';
import { UsersService } from './users.service';
import { RegisterFormQuestionService } from './components/register/register-form-question.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    DynamicFormModule
  ],
  declarations: [
    RegisterComponent
  ],
  providers: [UsersService, RegisterFormQuestionService]
})
export class UsersModule { }
