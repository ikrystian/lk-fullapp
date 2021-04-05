import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {TrainingsService} from '../../../shared/trainings.service';
import {Subscription} from 'rxjs';

export class Progress {
  currentTotalTraining: number;
  currentTraining: number;
  lastTraining: number;
  percentage: number;
  currentInSeriesTotal: number;
  message: string;
}

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

  defaultData: Progress = {
    currentTotalTraining: 0,
    currentTraining: 0,
    lastTraining: 0,
    percentage: 0,
    currentInSeriesTotal: 0,
    message: 'brak danych 😒'
  };

  totalForSeries: Progress = this.defaultData;

  constructor(public trainingsService: TrainingsService) {
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

    if (!this.data.exerciseId || this.data.exerciseId === 0) {
      return;
    }

    const series = (localStorage.getItem('series')) ? JSON.parse(localStorage.getItem('series')) : [];
    if (series.length === 0) {
      return;
    }
    const currentBodyPartSeries = series.filter(el => el.bodyPartId = this.data.bodyPartId);
    currentBodyPartSeries.forEach(el => {
      this.bodyPartTotal += el.weight * el.reps * el.multiplier;
    });

    series.forEach(el => {
      this.trainingTotal += el.weight * el.reps * el.multiplier;
    });

    const currentExercise = series.filter(el => el.exercise_type_id === this.data.exerciseId);
    currentExercise.forEach(el => {
      this.currentTotal += el.weight * el.reps * el.multiplier;
    });

    this.trainingsService.getLastExerciseSum(this.data).subscribe(res => {
      this.totalForSeries = res;
      this.totalForSeries.percentage = (this.currentTotal / res.lastTraining) * 100;
    }, (error) => {
      console.log(error);
      this.totalForSeries = this.defaultData;
    });
  }
}

