import { Observable } from 'rxjs';

import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { TrainingsService } from '../../../shared/trainings.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit, OnChanges {
  exerciseForm: FormGroup;
  series: any = [];
  id;
  average: any;
  averageForSeries: any;
  total: any;

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
  @ViewChild('addSeriesForm') addSeriesForm: ElementRef;

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.trainingService.getExercises(this.trainingId, this.exerciseId).subscribe(res => {
      this.series = res;
      if (this.exerciseId !== 0) {
        this.currentAverage(this.series);
      }
    });
    this.trainingService.getAverageWeightForExercise(this.exerciseId, this.trainingId).subscribe(res => {
      this.average = res;
    });

    this.getAverageWeight();
  }


  createSeriesForm = () => {
    this.exerciseForm = this.formBuilder.group({
      exercise_type_id: [this.exerciseId],
      reps: [],
      weight: [],
      multiplier: [],
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
    if (!confirm('Na pewno chcesz usunąć trening? Akcja jest nieodwracalna')) {
      return false;
    }

    this.trainingService.removeTraining(trainingId).subscribe(res => {
      this.router.navigate(['/dashboard']);
      this.openSnackBar('Trening został usunięty', 'OK');
    });

  }

  getAverageWeight(): void {
    this.trainingService.getToralWeightByTraining(this.trainingId).subscribe(res => {
      this.total = res;
    });
  }

  onSubmit = (form) => {
    this.exerciseForm.disable();


    const series = this.exerciseForm.value;
    series.exercise_type_id = this.exerciseId;
    series.training_id = this.trainingId;
    const ele = this.addSeriesForm.nativeElement['reps'];

    this.exerciseForm.get('reps').reset();
    this.exerciseForm.get('weight').reset();

    this.trainingService.addSeries(series).subscribe(res => {
      this.series.unshift(res);
      this.currentAverage(this.series);
      this.exerciseForm.enable();
      if (ele) {
        ele.focus();
      }
    });
    this.getAverageWeight();
    this.openSnackBar('Seria została dodana', 'OK');

  }

  removeExercise = (seriesId: number) => {
    if (!confirm('Na pewno chcesz usunąć serię? Akcja jest nieodwracalna')) {
      return false;
    }

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
