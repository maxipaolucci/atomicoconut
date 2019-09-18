import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialDesignModule } from '../../modules/shared/custom-material-design.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { UsersService } from './users.service';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AccountComponent } from './components/account/account.component';
import { AccountFinanceInfoComponent } from './components/account-finance-info/account-finance-info.component';
import { AccountPersonalInfoComponent } from './components/account-personal-info/account-personal-info.component';
import { AccountUserInfoComponent } from './components/account-user-info/account-user-info.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './user.reducer';
import { UserResolver } from './user-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialDesignModule,
    SharedModule,
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer)
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    AccountComponent,
    AccountFinanceInfoComponent,
    AccountPersonalInfoComponent,
    AccountUserInfoComponent
  ],
  providers: [ 
    UsersService,
    UserResolver,
  ]
})
export class UsersModule {}
