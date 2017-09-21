import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { ActivatedRouteSnapshot } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path : 'register', component : RegisterComponent },
  { path : 'login', component : LoginComponent },
  { path : 'account/reset/expired', component : LoginComponent },
  { path : 'account/reset/:token', component : ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
