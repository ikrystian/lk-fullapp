import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  trainings;
  training;


  constructor(
    public router: Router,
    private geolocation: GeolocationService,
    private authenticationStateService: AuthenticationStateService,
    private tokenAuthService: TokenAuthService,
    private trainingService: TrainingsService
  ) {
  }

  ngOnInit(): void {
    this.getTrainings();
  }

  getTrainings = () => {
    this.trainingService.getTrainings().subscribe((res: any) => {
      this.trainings = res.data;
    });
  }

  logOut(): void {
    this.authenticationStateService.setAuthState(false);
    this.tokenAuthService.destroyToken();
    this.router.navigate(['signin']);
  }
}
