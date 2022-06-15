import {
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges, Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { TrainingsService } from '../../../shared/trainings.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ExerciseService } from '../../../shared/exercise-service.service';
import { Series } from '../../../models/series';


const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({height: 0}), stagger('60ms', animate('600ms ease-out', style({height: 36})))],
      {optional: true}
    ),
    query(':leave',
      animate('200ms', style({height: 0})),
      {optional: true}
    )
  ])
]);


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  animations: [listAnimation]
})

export class ExerciseComponent implements OnChanges {
  @Output() restBarIndicator = new EventEmitter<boolean>();
  @Input() exercise: any;
  exerciseForm: FormGroup;
  series: Series[];
  trainingId: number;
  reps: number;
  weight: number;
  isFormInvalid: boolean;
  isLBS = false;

  @ViewChild('addSeriesForm') addSeriesForm: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public trainingService: TrainingsService,
    private snackBar: MatSnackBar,
    private exerciseService: ExerciseService,
  ) {
    this.trainingId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 0);
    this.createSeriesForm();
  }

  ngOnChanges(): void {
    this.series = this.exerciseService.setLocalSeries();
    this.series = this.series.filter(el => el.series_type_id === this.exercise.id);
    this.sortSeries(this.series);
  }

  createSeriesForm(): void {
    this.exerciseForm = this.formBuilder.group({
      series_type_id: [this.exercise?.id],
      reps: [],
      weight: [],
      multiplier: [],
      training_id: [this.trainingId],
      exercise_type_id: [parseInt(this.exercise?.exercise_type_id, 0)]
    });

  }

  removeTraining(trainingId: number): any {
    if (!confirm('Na pewno chcesz usunąć trening? Akcja jest nieodwracalna')) {
      return false;
    }

    this.trainingService.removeTraining(trainingId).subscribe(() => {
      this.router.navigate(['/dashboard']);
      this.snackBar.open('Trening został usunięty', 'OK');
    });
  }

  weightKeyUp(event): void {
    if (event.key === 'Backspace' && event.target.value === '') {
      event.preventDefault();
      this.addSeriesForm.nativeElement.reps.focus();
    }
  }

  onSubmit(): boolean {
    this.restBarIndicator.emit(true);
    const series = this.exerciseForm.value;
    const weightField = this.addSeriesForm.nativeElement.weight;
    if (this.exercise.exercise_type_id === 2) {
      series.weight = 1;
    }
    if (!series.reps || !series.weight) {
      return false;
    }

    series.reps = series.reps || this.reps;
    series.weight = series.weight || this.weight;
    series.weight = (this.isLBS) ? series.weight * 0.45359237 : series.weight;

    series.series_type_id = this.exercise.id;
    series.training_id = this.trainingId;
    series.multiplier = this.exercise.multiplier;
    series.bodyPartId = this.exercise.body_part_id;
    series.exercise_type_id = parseInt(this.exercise.exercise_type_id, 0);
    series.id = Math.random();
    series.name = this.exercise.name;

    this.exerciseService.addSeries(series).subscribe((response) => {
      series.id = response.id;
      this.series.unshift(series);
      this.exerciseService.removeLocalSeries(series);
      this.sortSeries(this.series);
      this.trainingService.updateProgress();
      this.isFormInvalid = true;
      this.exerciseForm.reset();
      this.exerciseForm.controls.reps.setValue(series.reps);
      weightField.focus();
      return true;
    });
  }

  sortSeries(series: Series[]): void {
    if (series) {
      const sorted = [...series].sort((a, b) => {
        return (b.weight * b.reps) - (a.weight * a.reps);
      });

      series.map(el => {
        el.class = (el === sorted[0]) ? 'best' : '';
      });
    }
  }

  removeExercise(series: Series): any {
    console.log(series);
    if (!confirm('Na pewno chcesz usunąć serię? Akcja jest nieodwracalna')) {
      return false;
    }

    this.exerciseService.removeSeries(series).subscribe((data) => {
      if (data !== 'removed') {
        return false;
      }

      this.series = this.series.filter((element) => {
        return element !== series;
      });

      const localSeries = this.exerciseService.setLocalSeries().filter((element) => {
        return element.id !== series.id;
      });

      this.exerciseService.saveLocalSeries(localSeries);
      this.sortSeries(this.series);
      this.trainingService.updateProgress();
      this.snackBar.open('Seria została usunięta', 'OK');
    });
  }
}
