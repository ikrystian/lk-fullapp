import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { NavigationModule } from '../shared/navigation/navigation.module';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { TrainingListModalComponent } from './training-list-modal/training-list-modal.component';
import { TrainingComponent } from './training/training.component';

@NgModule({
  declarations: [
    CalendarComponent,
    DashboardComponent,
    TrainingComponent,
    EditTrainingComponent,
    TrainingListModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    NavigationModule
  ]
})
export class DashboardModule { }
