import { Component, Input, OnInit } from '@angular/core';
import { TrainingsService } from '../../../shared/trainings.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise-progress',
  templateUrl: './exercise-progress.component.html',
  styleUrls: ['./exercise-progress.component.scss']
})
export class ExerciseProgressComponent implements OnInit {
  totalForSeries: number;
  showProgressBar = true;
  percentage;
  constructor(private trainingsService: TrainingsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.trainingsService.share.subscribe(x => {
      const data = {
        exerciseId: x.exerciseId,
        trainingId: x.trainingId
      };

      if (!data.exerciseId || !data.trainingId) return;
      this.trainingsService.getLastExerciseSum(data).subscribe(res => {
        this.totalForSeries = res;
        console.log(res);
        this.percentage = (res.currentTraining / res.lastTraining) * 100;
      });
    });
  }

}
