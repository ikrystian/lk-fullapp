import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TrainingsService } from '../../../shared/trainings.service';
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
  trainingId: number;
  coords = [];
  sending = false;
  subscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private trainingService: TrainingsService,
    private snackBar: MatSnackBar,
    private geolocation: GeolocationService,
  ) {
    this.trainingId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 0);
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
    const source = interval(3000);
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
      trainingId: this.trainingId,
      distance: new FormControl(''),
      time: new FormControl(''),
      weather: new FormControl('1')
    });
  }

  addRun(): any {
    const data = this.runForm.value;
    this.runForm.value.weather = parseInt(this.runForm.value.weather, 0);
    this.runForm.value.coords = this.coords;

    this.trainingService.addRun(data).subscribe(() => {
      this.runForm.reset();
      this.snackBar.open('Bieg został dodany do treningu', '🏃');
    });
  }
}
