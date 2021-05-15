import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { TrainingComponent } from './training/training.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { ProfileComponent } from '../profile/profile.component';
import { StatsComponent } from '../profile/stats/stats.component';
import { SettingsComponent } from './settings/settings.component';
import { MapComponent } from './map/map.component';
import { RunExerciseComponent } from './run-exercise/run-exercise.component';
import { RunDetailsComponent } from './run-details/run-details.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { RunsComponent } from './runs/runs.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: '', redirectTo: 'training-list', pathMatch: 'full'},
      {
        path: 'training-list', component: TrainingsComponent, children: [
          {path: '', redirectTo: 'list', pathMatch: 'full'},
          {path: 'list', component: TrainingListComponent},
          {path: 'runs', component: RunsComponent},
          {path: 'calendar', component: CalendarComponent}
        ]
      },
      {path: 'training/:id', component: TrainingComponent},
      {path: 'training/:id/edit', component: EditTrainingComponent},
      {path: 'training/:id/edit/:exerciseId', component: EditTrainingComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'stats', component: StatsComponent},
      {path: 'map', component: MapComponent},
      {path: 'new-run', component: RunExerciseComponent},
      {path: 'run/:id', component: RunDetailsComponent},
    ]
  },
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
