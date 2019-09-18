import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AccountComponent } from './components/account/account.component';
import { UserResolver } from './user-resolver.service';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path : 'users',
    children : [
      { path : 'register', component : RegisterComponent },
      { path : 'login/:state', component : LoginComponent },
      { path : 'login', component : LoginComponent },
      { 
        path : 'account', 
        component : AccountComponent,
        canActivate: [ AuthGuard ],
        resolve : {
          authUser : UserResolver
        }
      },
      { 
        path : 'account/reset/expired',
        redirectTo : 'login/reset-password-token-expired',
        pathMatch : 'full'
      },
      { path : 'account/reset/:token', component : ResetPasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
