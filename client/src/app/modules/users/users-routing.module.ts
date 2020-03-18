import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AccountComponent } from './components/account/account.component';
import { UserResolver } from './user-resolver.service';
import { AuthGuard } from '../../auth.guard';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';

const routes: Routes = [
  {
    path : 'users',
    children : [
      { path : 'register', component : RegisterComponent },
      { path : 'login', component : LoginComponent },
      { 
        path : 'account', 
        component : AccountComponent,
        canActivate: [ AuthGuard ],
        resolve : {
          inflatedUser : UserResolver
        }
      },
      { path : 'account/reset/:token', component : ResetPasswordComponent },
      { path : 'account/activation/:token', component : AccountActivationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
