import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingsService } from '../../shared/trainings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { interval, Subscription } from 'rxjs';
import { repeat, take } from 'rxjs/operators';
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
      time: new FormControl(''),
      weather: 1,
      type: 0
    });
  }

  addRun(): any {
    const data = this.runForm.value;
    this.runForm.value.weather = parseInt(this.runForm.value.weather, 0);
    this.runForm.value.coords = this.coords;

    this.trainingService.addRun(data).subscribe((res) => {
      this.runForm.reset();
      this.snackBar.open('Bieg został utworzony', '🏃');
      this.router.navigate([`/dashboard/training-list/list`]);
      // this.router.navigate([`/dashboard/run/${res.id}`]);
    });
  }
}
