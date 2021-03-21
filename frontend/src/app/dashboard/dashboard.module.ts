import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import {  MatDatepickerModule } from '@angular/material/datepicker';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExerciseComponent } from './edit-training/exercise/exercise.component';
import { MatTableModule } from '@angular/material/table';
import { NgPipesModule } from 'ngx-pipes';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    CalendarComponent,
    DashboardComponent,
    TrainingComponent,
    EditTrainingComponent,
    TrainingListModalComponent,
    ExerciseComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    NavigationModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    NgPipesModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]


})
export class DashboardModule {
}
