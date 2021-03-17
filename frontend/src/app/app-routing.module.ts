import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { DashboardComponent } from './components/profile/dashboard/dashboard.component';
import { TrainingComponent } from './components/profile/training/training.component';
import { EditTrainingComponent } from './components/profile/edit-training/edit-training.component';

const routes: Routes = [
  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {path: 'signin', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'user-profile', component: ProfileComponent},
  {path: 'user-profile/dashboard', component: DashboardComponent},
  {path: 'user-profile/training/:id', component: TrainingComponent},
  {path: 'user-profile/training/:id/edit', component: EditTrainingComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'update-password', component: UpdatePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
