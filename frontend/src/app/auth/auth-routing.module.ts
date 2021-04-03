import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GuestGuard } from '../guest.guard';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {UpdatePasswordComponent} from './update-password/update-password.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
      {path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
      {path: 'forgot-password', component: ResetPasswordComponent, canActivate: [GuestGuard]},
      {path: 'update-password', component: UpdatePasswordComponent, canActivate: [GuestGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
