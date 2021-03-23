import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { TrainingsService } from '../shared/trainings.service';
import { GeolocationService } from '@ng-web-apis/geolocation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  trainings;
  training;
  userPosition;

  constructor(
    public trainingService: TrainingsService,
    public router: Router,
    private geolocation: GeolocationService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getTrainings();
    this.geolocation.subscribe(position => {
      this.userPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    });

  }

  getTrainings = () => {
    this.trainingService.getTrainings().subscribe((res: any) => {
      this.trainings = res.data;
    });
  }


  addTraining(): void {
    this.trainingService.addTraining(this.userPosition).subscribe(res => {
      this.training = res;
      console.log(res);
      this.openSnackBar('Trening został utworzony', 'ok');
      // this.router.navigate([`dashboard/training/${this.training.id}/edit`]);
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }
}
