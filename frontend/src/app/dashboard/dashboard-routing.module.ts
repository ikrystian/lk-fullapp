import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { TrainingComponent } from './training/training.component';
import { TrainingsComponent } from './trainings/trainings.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
      { path: '', redirectTo: 'training-list', pathMatch: 'full' },
      { path: 'training-list', component: TrainingsComponent },
    ]},
  { path: 'training/:id', component: TrainingComponent },
  { path: 'training/:id/edit', component: EditTrainingComponent },
  { path: 'training/:id/edit/:exerciseId', component: EditTrainingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
