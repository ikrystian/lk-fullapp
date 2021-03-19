import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingsService } from '../../../../shared/trainings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  exerciseForm: FormGroup;
  series: any = [];
  id;
  average: any;
  averageForSeries: any;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public trainingService: TrainingsService,
    private snackBar: MatSnackBar
  ) {
    this.createSeriesForm();
  }

  @Input() exerciseId: number;
  @Input() trainingId: number;

  ngOnInit(): void {

    this.trainingService.getExercises(this.trainingId, this.exerciseId).subscribe(res => {
      this.series = res;
      this.currentAverage(this.series);
    });
    this.trainingService.getAverageWeightForExercise(this.exerciseId, this.trainingId).subscribe(res => {
      this.average = res;
    });
  }

  createSeriesForm = () => {
    this.exerciseForm = this.formBuilder.group({
      exercise_type_id: [this.exerciseId],
      reps: [],
      weight: [],
      training_id: [this.trainingId]
    });
  }

  currentAverage = (series) => {
    let r = 0;
    series.map(el => {
      r += (el.reps * el.weight);
    });
    this.averageForSeries = r;
  }

  removeTraining = (trainingId: number) => {
    this.trainingService.removeTraining(trainingId).subscribe(res => {
      this.router.navigate(['/user-profile/dashboard']);
      this.openSnackBar('Trening został usunięty', 'OK');
    });
  }

  onSubmit = (form) => {
    const series = this.exerciseForm.value;
    series.exercise_type_id = this.exerciseId;
    series.training_id = this.trainingId;
    console.log(series);
    this.trainingService.addSeries(series).subscribe(res => {
      this.series.unshift(res);
      this.currentAverage(this.series);
      this.exerciseForm.get('reps').reset();
      this.exerciseForm.get('weight').reset();
    });
  }

  removeExercise = (seriesId: number) => {
    this.trainingService.removeExercise(seriesId).subscribe(res => {
      this.openSnackBar('Seria została usunięta', 'OK');

      this.series = this.series.filter((element) => {
        return element.id !== seriesId;
      });
    });
  }

  openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }

}
