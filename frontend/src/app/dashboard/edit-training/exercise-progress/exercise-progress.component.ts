import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { TrainingsService } from '../../../shared/trainings.service';
import { Subscription } from 'rxjs';

export class Progress {
  currentTotalTraining: number;
  currentTraining: number;
  lastTraining: number;
  percentage: number;
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

  defaultData: Progress = {
    currentTotalTraining: 0,
    currentTraining: 0,
    lastTraining: 0,
    percentage: 0,
    message: 'brak danych 😒'
  };

  totalForSeries: Progress =  this.defaultData;

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
    if (this.data.exerciseId === 0) {
      return;
    }

    this.trainingsService.getLastExerciseSum(this.data).subscribe(res => {
      this.totalForSeries = res;
      this.totalForSeries.percentage = (res.currentTraining / res.lastTraining) * 100;
    }, () => {
      this.totalForSeries = this.defaultData;
    });
  }
}

