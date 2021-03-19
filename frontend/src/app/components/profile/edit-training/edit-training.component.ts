import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../../shared/trainings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.scss']
})
export class EditTrainingComponent implements OnInit {
  exerciseTypes;
  training: any;
  average: any;
  exercises: any;
  series: any = [];
  averageForSeries: any;
  trainingName: string;
  exerciseForm: FormGroup;

  constructor(
    public trainingService: TrainingsService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.trainingService.getTraining(id).subscribe((res: any) => {
      this.training = res;
      if (this.training.end) {
        this.router.navigate([`/user-profile/training/${this.training.id}`]);
      }
      this.createSeriesForm();
      this.trainingName = res.name;
    });
  }

  createSeriesForm = () => {
    this.exerciseForm = this.formBuilder.group({
      exercise_type_id: [],
      reps: [],
      weight: [],
      training_id: [this.training.id]
    });
  }

  ngOnInit(): void {
    this.trainingService.getExercisesTypes().subscribe(types => {
      this.exerciseTypes = types;
    });
    if (localStorage.getItem('series')) {
      this.series = JSON.parse(localStorage.getItem('series'));
    }
  }

  currentAverage = (series) => {
    let r = 0;
    series.map(el => {
      r += (el.reps * el.weight);
    });

    this.averageForSeries = r;

  }

  finishWorkout(id): void {
    this.trainingService.finishTraining(id).subscribe(res => {
      this.router.navigate([`/user-profile/training/${id}`]);
    });
  }

  change = () => {
    console.log('asd');
  }

  onSubmit = (form: NgForm) => {
    const series = this.exerciseForm.value;
    this.trainingService.addSeries(series).subscribe(res => {
      this.series.unshift(res);
      this.currentAverage(this.series);
      this.exerciseForm.get('reps').reset();
      this.exerciseForm.get('weight').reset();
      console.log(res);
    });
  }

  changeExercise(val): void {

    this.trainingService.getExercises(this.training.id, val).subscribe(res => {
      this.series = res;
      this.currentAverage(this.series);
    });
    this.trainingService.getAverageWeightForExercise(val, this.training.id).subscribe(res => {
      this.average = res;
    });

  }

  changeTrainingName = (event: any) => {
    console.log(event.target.value);
    console.log(this.trainingName);
    if (this.trainingName != event.target.value) {
      this.trainingService.changeName(this.training.id, event.target.value).subscribe(res => {
        this.openSnackBar('Nazwa treningu została zmieniona', 'ok');
      });
    }
  }

  removeTraining = (trainingId: number) => {
    this.trainingService.removeTraining(trainingId).subscribe(res => {
      this.router.navigate(['/user-profile/dashboard']);
      this.openSnackBar('Trening został usunięty', 'OK');
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

  onSync = () => {
    console.log(this.series);
    this.trainingService.addSeries(this.series).subscribe(res => {
      console.log(res);
    });
  }
}
