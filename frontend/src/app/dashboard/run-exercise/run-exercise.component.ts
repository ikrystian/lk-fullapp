import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingsService} from '../../shared/trainings.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {interval, Subscription} from 'rxjs';
import {repeat, take, timestamp} from 'rxjs/operators';
import { Run } from '../../models/run';

@Component({
  selector: 'app-run-exercise',
  templateUrl: './run-exercise.component.html',
  styleUrls: ['./run-exercise.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RunExerciseComponent implements OnInit {
  @Input() exercise: any;
  @Input() training: any;
  runForm: FormGroup;
  sending = false;
  runs: Run[];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private trainingService: TrainingsService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.createRunForm();
    console.log(this.training);
    this.trainingService.getTrainingRun({trainingId: this.training.id, type: this.exercise.id}).subscribe(res => {
      this.runs = res;
    });
  }

  createRunForm(): void {
    this.runForm = this.formBuilder.group({
      distance: new FormControl(''),
      minutes: new FormControl(''),
      seconds: new FormControl(''),
      weather: 1,
      type: this.exercise.id,
    });
  }

  addRun(): any {
    const data = this.runForm.value;
    if (data.seconds < 10) {
      data.seconds = 0 + data.seconds;
    }

    const finalData = {
      id: Date.now(),
      trainingId: this.training.id,
      distance: data.distance,
      time: (data.minutes * 60) + data.seconds,
      type: this.exercise.id,
      weather: parseInt(data.weather, 0),
      coords: []
    };

    this.trainingService.addRun(finalData).subscribe((res) => {
      this.runForm.reset();
      this.snackBar.open('Cwiczenie zostało dodane', '🏃');
    });
  }
}
