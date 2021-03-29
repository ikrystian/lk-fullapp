import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { TrainingsService } from '../../../shared/trainings.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';


const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({opacity: 0, height: 0}), stagger('60ms', animate('600ms ease-out', style({opacity: 1, height: 36})))],
      {optional: true}
    ),
    query(':leave',
      animate('200ms', style({opacity: 0, height: 0})),
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

export class ExerciseComponent implements OnInit, OnChanges, OnDestroy {
  exerciseForm: FormGroup;
  addSeriesFormOneField: FormGroup;
  series: any = [];

  message: string;
  subscription: Subscription;
  oneField =  localStorage.getItem('oneField') || false;
  trainingId;
  @Input() exercise: any;
  @ViewChild('addSeriesForm') addSeriesForm: ElementRef;
  @ViewChild('addSeriesFormOne') addSeriesFormOne: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public trainingService: TrainingsService,
    private snackBar: MatSnackBar
  ) {
    this.trainingId = this.activatedRoute.snapshot.paramMap.get('id');

    this.createSeriesForm();
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.series = [];
    console.log( this.exercise.body_part_id);
    this.trainingService.getExercises(this.trainingId, this.exercise.id).subscribe(res => {
      this.series = res;
      this.sortSeries(this.series);
    });
  }


  createSeriesForm = () => {
    this.exerciseForm = this.formBuilder.group({
      exercise_type_id: [this.exercise?.id],
      reps: [],
      weight: [],
      multipler: [],
      training_id: [this.trainingId]
    });

    this.addSeriesFormOneField = this.formBuilder.group({
      exercise_type_id: [this.exercise?.id],
      oneField: [],
      training_id: [this.trainingId]
    });


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

  ngOnDestroy(): void {

  }


  onSubmit = (form) => {
    this.exerciseForm.disable();
    const series = this.exerciseForm.value;
    const respField = this.addSeriesForm.nativeElement.reps;

    this.exerciseForm.get('reps').reset();
    this.exerciseForm.get('weight').reset();

    this.saveT(this.exerciseForm, series, respField);
  }

  onSubmitOneField(form): any {
    this.addSeriesFormOneField.disable();
    const series = this.addSeriesFormOneField.value;
    const values = series.oneField.trim().split(' ');
    if(values.length !== 2) {
      this.openSnackBar('Nieprawidłowy format', 'OK');
      this.addSeriesFormOneField.enable();
      return false;
    }
    if(isNaN(values[0]) || isNaN(values[1])) {
      this.openSnackBar('Podane wartośc nie są liczbami', 'OK');
      this.addSeriesFormOneField.enable();
      return false;
    }
    series.reps = values[0];
    series.weight = values[1];

    this.addSeriesFormOneField.get('oneField').reset();
    const respField = this.addSeriesFormOne.nativeElement.oneField;
    this.saveT(this.addSeriesFormOneField, series, respField);
  }

  saveT(form, series, respField): void {
    series.exercise_type_id = this.exercise.id;
    series.training_id = this.trainingId;
    series.bodyPartId = this.exercise.body_part_id;
    this.trainingService.addSeries(series).subscribe(res => {
      this.trainingService.changeMessage();

      this.series.unshift(res);
      this.sortSeries(this.series);
      this.openSnackBar('Seria została dodana', 'OK');
      form.enable();
      if (respField) {
        respField.focus();
      }
    });
  }

  sortSeries(series): void {
    if (series) {
      const sorted = [...series].sort((a, b) => {
        return (b.weight * b.reps) - (a.weight * a.reps);
      });

      series.map(el => {
        el.class = (el === sorted[0]) ? 'best' : '';
      });
    }
  }

  removeExercise = (seriesId: number) => {
    if (!confirm('Na pewno chcesz usunąć serię? Akcja jest nieodwracalna')) {
      return false;
    }

    this.trainingService.removeExercise(seriesId).subscribe(() => {
      this.trainingService.changeMessage();
      this.openSnackBar('Seria została usunięta', 'OK');
      this.series = this.series.filter((element) => {
        return element.id !== seriesId;
      });
      this.sortSeries(this.series);
    });
  }

  openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action);
  }

  onSwipe(event): void {
    Math.abs(event.deltaX) > 40 ? this.changeInputType() : '';
  }
  changeInputType(): void {
    this.oneField = !this.oneField;
    localStorage.setItem('oneField', this.oneField.toString());
  }

}
