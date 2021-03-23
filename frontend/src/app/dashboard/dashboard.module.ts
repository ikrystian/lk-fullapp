import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { LogComponent } from './log/log.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TrainingListComponent } from './training-list/training-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    CalendarComponent,
    DashboardComponent,
    TrainingComponent,
    EditTrainingComponent,
    TrainingListModalComponent,
    ExerciseComponent,
    LogComponent,
    TrainingListComponent
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
    MatNativeDateModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatListModule,
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: {}},
    MatDialogModule
  ]


})
export class DashboardModule {
}
