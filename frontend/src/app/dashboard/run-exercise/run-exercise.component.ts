import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingsService } from '../../shared/trainings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { interval, Subscription } from 'rxjs';
import { repeat, take, timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-run-exercise',
  templateUrl: './run-exercise.component.html',
  styleUrls: ['./run-exercise.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RunExerciseComponent implements OnInit {
  runForm: FormGroup;
  trainingId: 0;
  coords = [];
  sending = false;
  lock;
  subscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private trainingService: TrainingsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private geolocation: GeolocationService,
  ) {

  }

  lockScreen(): void {
    // here will be lock screen func, in someday
  }

  ngOnInit(): void {
    this.createRunForm();
  }

  stopRun(): void {
    this.subscription.unsubscribe();
    this.sending = false;
  }

  startRun(): void {
    this.sending = true;
    const source = interval(5000);
    const example = source.pipe(take(1), repeat());
    this.subscription = example.subscribe(x => {
      this.geolocation.subscribe(data => {
        console.log(data.coords.latitude, data.coords.longitude);
        this.trainingService.addCoords({lat: data.coords.latitude, lng: data.coords.longitude}).subscribe(res => {
          console.log(res);
        });
      });
    });
  }

  createRunForm(): void {
    this.runForm = this.formBuilder.group({
      distance: new FormControl(''),
      minutes: new FormControl(''),
      seconds: new FormControl(''),
      weather: 1,
      type: new FormControl(''),
    });
  }

  addRun(): any {
    const data = this.runForm.value;
    if(data.seconds < 10) {
      data.seconds = 0 + data.seconds;

    }
    const finalData = {
      id: Date.now(),
      trainingId: Date.now(),
      distance: data.distance,
      time: (data.minutes * 60) + data.seconds,
      type: data.type,
      weather: parseInt(data.weather, 0),
      coords: data.coords,
    };

    this.trainingService.addRun(finalData).subscribe((res) => {
      this.runForm.reset();
      this.snackBar.open('Cwiczenie zostało dodane', '🏃');
      this.router.navigate([`/dashboard/training-list/list?activeTab=1`]);
    });
  }
}
