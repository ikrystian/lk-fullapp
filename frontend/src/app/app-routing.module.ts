import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StatsComponent } from './components/profile/stats/stats.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './guest.guard';

const routes: Routes = [
  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {path: 'stats', component: StatsComponent},
  {path: 'signin', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'signup', component: RegisterComponent},
  {path: 'user-profile', component: ProfileComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'update-password', component: UpdatePasswordComponent},
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
