import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

import {TrainingsService} from '../../../shared/trainings.service';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';


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
  series: any = [];

  message: string;
  oneField = localStorage.getItem('oneField') || false;
  trainingId;
  reps;
  weight;
  isFormInvalid = true;
  isLBS = false;

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
    this.trainingId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 0);

    this.createSeriesForm();
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.series = (localStorage.getItem('series')) ? JSON.parse(localStorage.getItem('series')) : [];
    this.series = this.series.filter(el => el.exercise_type_id === this.exercise.id);
    // this.trainingService.getExercises(this.trainingId, this.exercise.id).subscribe(res => {
    //   this.series = res;
    //   this.sortSeries(this.series);
    // });
  }


  createSeriesForm = () => {
    this.exerciseForm = this.formBuilder.group({
      exercise_type_id: [this.exercise?.id],
      reps: [],
      weight: [],
      oneField: [],
      multiplier: [],
      training_id: [this.trainingId]
    });

  }

  removeTraining(trainingId: number): any {
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

  oneFieldInputChanged(textValue: string): void {
    const values = textValue.split('.');
    if (values.length !== 2) {
      return;
    }

    this.reps = values[0];
    this.weight = values[1];
    this.isFormInvalid = false;

  }

  onSubmit = (form) => {
    const LSSeries = (localStorage.getItem('series')) ? JSON.parse(localStorage.getItem('series')) : [];
    const series = this.exerciseForm.value;
    const respField = this.addSeriesForm.nativeElement.reps;
    const oneField = this.addSeriesForm.nativeElement.oneField;

    this.exerciseForm.get('oneField').reset();
    this.exerciseForm.get('reps').reset();
    this.exerciseForm.get('weight').reset();

    series.reps = series.reps || this.reps;
    series.weight = series.weight || this.weight;
    series.weight = (this.isLBS) ? series.weight * 0.45359237 : series.weight;
    series.exercise_type_id = this.exercise.id;
    series.training_id = this.trainingId;
    series.multiplier = this.exercise.multipler;
    series.bodyPartId = this.exercise.body_part_id;
    series.id = Date.now();
    this.series.unshift(series);
    LSSeries.unshift(series);
    this.sortSeries(this.series);
    this.openSnackBar('Seria została dodana', 'OK');
    localStorage.setItem('series', JSON.stringify(LSSeries));
    this.isFormInvalid = false;
    (this.oneField) ? oneField.focus() : respField.focus();
    this.trainingService.changeMessage();
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

  removeExercise = (series: any) => {
    let LSSeries = (localStorage.getItem('series')) ? JSON.parse(localStorage.getItem('series')) : [];
    if (!confirm('Na pewno chcesz usunąć serię? Akcja jest nieodwracalna')) {
      return false;
    }

    this.openSnackBar('Seria została usunięta', 'OK');
    this.series = this.series.filter((element) => {
      return element !== series;
    });

    LSSeries = LSSeries.filter((element) => {
      return element.id !== series.id;
    });
    localStorage.setItem('series', JSON.stringify(LSSeries));
    this.sortSeries(this.series);
    this.trainingService.changeMessage();
  }

  openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action);
  }

  onTap(event): void {
    if (event.tapCount === 4) {
      this.changeInputType();
    }
  }

  changeInputType(): void {
    this.oneField = !this.oneField;
    localStorage.setItem('oneField', this.oneField.toString());
  }

}
