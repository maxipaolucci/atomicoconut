import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AccountComponent } from './components/account/account.component';
import { AuthResolver } from '../../auth-resolver.service';

const routes: Routes = [
  {
    path : 'users',
    children : [
      { path : 'register', component : RegisterComponent },
      { path : 'login', component : LoginComponent },
      { 
        path : 'account', 
        component : AccountComponent,
        resolve : {
          authUser : AuthResolver
        }
      },
      { path : 'account/reset/expired', component : LoginComponent },
      { path : 'account/reset/:token', component : ResetPasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
