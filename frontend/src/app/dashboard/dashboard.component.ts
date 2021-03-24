import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { TrainingsService } from '../shared/trainings.service';
import { GeolocationService } from '@ng-web-apis/geolocation';
import * as moment from 'moment';
import { AuthenticationStateService } from '../shared/authentication-state.service';
import { TokenAuthService } from '../shared/token-auth.service';
import { JwtService } from '../shared/jwt.service';

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
    private authenticationStateService: AuthenticationStateService,
    private tokenAuthService: TokenAuthService,
    private jwtService: JwtService,
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


  addTraining(): any {
    const today = moment().format('YYYY-MM-DD');
    const todayTrainings = this.trainings.filter(el => el.training_date === today);
    if (todayTrainings.length > 0) {
      if (!confirm('Istnieje już trening z dzisiejszą datą, chcesz dodać nowy?')) {
        return false;
      }
    }

    this.trainingService.addTraining(this.userPosition).subscribe(res => {
      this.training = res;
      this.openSnackBar('Trening został utworzony', 'ok');
      this.router.navigate([`dashboard/training/${this.training.id}/edit`]);
    });
  }


  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }

  logOut(): void {
    this.authenticationStateService.setAuthState(false);
    this.tokenAuthService.destroyToken();
    this.router.navigate(['signin']);
  }
}
