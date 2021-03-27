import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
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
      [style({opacity: 0, height: 0}), stagger('60ms', animate('600ms ease-out', style({opacity: 1, height: 37})))],
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

export class ExerciseComponent implements OnInit, OnChanges, OnDestroy  {
  @Output() newItemEvent = new EventEmitter<any>();
  exerciseForm: FormGroup;
  series: any = [];
  id;
  text = '';

  message: string;
  subscription: Subscription;

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
  @Input() bodyPartId: number;
  @ViewChild('addSeriesForm') addSeriesForm: ElementRef;

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.trainingService.getExercises(this.trainingId, this.exerciseId).subscribe(res => {
      this.series = res;
      this.sortSeries(this.series);
    });
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
    this.subscription.unsubscribe();
  }

  onSubmit = (form) => {
    this.exerciseForm.disable();
    this.newItemEvent.emit({exerciseId: this.exerciseId, trainingId: this.trainingId});
    const series = this.exerciseForm.value;
    series.exercise_type_id = this.exerciseId;
    series.training_id = this.trainingId;
    series.bodyPartId = this.bodyPartId;
    const ele = this.addSeriesForm.nativeElement['reps'];

    this.trainingService.changeMessage();

    this.exerciseForm.get('reps').reset();
    this.exerciseForm.get('weight').reset();

    this.trainingService.addSeries(series).subscribe(res => {
      this.series.unshift(res);
      this.sortSeries(this.series);
      this.exerciseForm.enable();
      if (ele) {
        ele.focus();
      }
    });
    this.openSnackBar('Seria została dodana', 'OK');

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
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }

}
