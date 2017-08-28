import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module'; 
import { FormsModule } from '@angular/forms';
import { CustomMaterialDesignModule } from '../../modules/custom-material-design/custom-material-design.module';

import { RegisterComponent } from './components/register/register.component';
import { UsersService } from './users.service';
import { RegisterFormQuestionService } from './components/register/register-form-question.service';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    DynamicFormModule,
    CustomMaterialDesignModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [UsersService, RegisterFormQuestionService]
})
export class UsersModule {}
