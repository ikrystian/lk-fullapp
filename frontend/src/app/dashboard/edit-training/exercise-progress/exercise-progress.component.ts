import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { TrainingsService } from '../../../shared/trainings.service';
import { Subscription } from 'rxjs';
import { Progress } from '../../../models/progress';
import { MatDialog } from '@angular/material/dialog';
import { RecordComponent } from '../../../shared/record/record.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-exercise-progress',
  templateUrl: './exercise-progress.component.html',
  styleUrls: ['./exercise-progress.component.scss']
})

export class ExerciseProgressComponent implements OnChanges, OnInit, OnDestroy {
  @Input() data: any;
  subscription: Subscription;
  message: string;
  currentTotal: number;
  trainingTotal: number;
  bodyPartTotal: number;
  exercise = 0;
  progress = 0;
  defaultData: Progress = {
    currentTotalTraining: 0,
    currentTraining: 0,
    lastTraining: 0,
    percentage: 0,
    currentInSeriesTotal: 0,
    message: 'brak danych 😒'
  };

  totalForSeries: Progress = this.defaultData;

  constructor(public trainingsService: TrainingsService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.subscription = this.trainingsService.currentMessage.subscribe(() => {
      this.updateProgressBar();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(): void {
    this.updateProgressBar();
  }

  updateProgressBar(): void {
    this.currentTotal = 0;
    this.trainingTotal = 0;
    this.bodyPartTotal = 0;
    console.info('asd');
    if (!this.data?.exercise?.id || this.data?.exercise?.id === 0) {
      return;
    }

    const series = (localStorage.getItem('series')) ? JSON.parse(localStorage.getItem('series')) : [];

    if (series.length !== 0) {

      const currentBodyPartSeries = series.filter(el => el.bodyPartId === this.data.exercise.body_part_id);
      currentBodyPartSeries.forEach(el => {
        this.bodyPartTotal += el.weight * el.reps;
      });

      series.forEach(el => {
        this.trainingTotal += el.weight * el.reps;
      });

      const currentExercise = series.filter(el => el.series_type_id === this.data.exercise.id);
      if (currentExercise.length === 0) {
        this.progress = 0;
      }

      currentExercise.forEach(el => {
        this.currentTotal += el.weight * el.reps;
      });
    }

    if (this.data.exercise.id !== this.exercise) {
      this.trainingsService.getAverageInTraining(this.data).subscribe(res => {
        this.totalForSeries = res;
        this.progress = (this.currentTotal / res.lastTraining) * 100;
      }, (error) => {
        this.snackBar.open(error.statusText, 'ok');
        this.totalForSeries = this.defaultData;
      });
      this.exercise = this.data.exercise.id;
    } else {
      this.progress = (this.currentTotal / this.totalForSeries.lastTraining) * 100;

    }
    if (this.progress > 100 && this.totalForSeries.lastTraining) {
      this.openRecordModal(this.exercise);
    }

  }

  openRecordModal(exerciseId: string | number): any {
    const currentRecordExercises = JSON.parse(localStorage.getItem('records')) || [];
    if (currentRecordExercises.includes(exerciseId)) {
      return false;
    }
    this.dialog.open(RecordComponent, {panelClass: 'record-modal'});
    currentRecordExercises.push(exerciseId);
    localStorage.setItem('records', JSON.stringify(currentRecordExercises));
  }
}

