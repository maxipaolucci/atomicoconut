import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialDesignModule } from '../../modules/custom-material-design/custom-material-design.module';

import { RegisterComponent } from './components/register/register.component';
import { UsersService } from './users.service';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialDesignModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [UsersService]
})
export class UsersModule {}
