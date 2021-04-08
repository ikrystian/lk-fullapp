import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { TrainingComponent } from './training/training.component';
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
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';
import { JwtService } from '../shared/jwt.service';
import { appInitializer } from '../_helpers/app.initializer';
import { TrainingImageComponent } from './edit-training/training-image/training-image.component';
import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';
import { ExerciseProgressComponent } from './edit-training/exercise-progress/exercise-progress.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileComponent } from '../profile/profile.component';
import { StatsComponent } from '../profile/stats/stats.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule } from '@ngx-translate/core';
import { TrainingListModalComponent } from './training-list-modal/training-list-modal.component';
import { ExercisePreviewComponent } from './exercise-preview/exercise-preview.component';
import { ChartsModule } from 'ng2-charts';
import { SettingsComponent } from './settings/settings.component';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [
    CalendarComponent,
    DashboardComponent,
    TrainingComponent,
    EditTrainingComponent,
    TrainingListModalComponent,
    ExerciseComponent,
    LogComponent,
    TrainingListComponent,
    CreateExerciseComponent,
    TrainingImageComponent,
    BottomNavComponent,
    ExerciseProgressComponent,
    TrainingsComponent,
    ProfileComponent,
    StatsComponent,
    ExercisePreviewComponent,
    SettingsComponent,
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
    MatRippleModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    TranslateModule,
    ChartsModule,
    TextFieldModule
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}},
    {provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [JwtService]},
    {provide: MAT_DIALOG_DATA, useValue: {}},
    MatDialogModule,
  ]
})
export class DashboardModule {
}
