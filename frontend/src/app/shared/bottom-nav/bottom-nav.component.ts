import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TrainingsService } from '../trainings.service';
import { JwtService } from '../jwt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Location } from '@angular/common';
import { User } from '../../profile/profile.component';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {
  userPosition;
  length;
  training;
  user: User;
  trainings: any;
  USER_IMAGE = 'https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-1/p200x200/105966252_10216830499211784_1193981541556713056_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=7206a8&_nc_ohc=3nQs7TVM02IAX8754nu&_nc_ht=scontent-frt3-1.xx&tp=6&oh=f38da299e4057b6485d123c3645dc1e0&oe=6081A1AE';

  constructor(
    public trainingService: TrainingsService,
    private jwtService: JwtService,
    private location: Location,
    private snackBar: MatSnackBar,
    public router: Router,
    private geolocation: GeolocationService,
  ) {

    this.geolocation.subscribe(position => {
      this.userPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    });

    this.jwtService.profile().subscribe((res: any) => {
      this.user = res;
    });
  }

  ngOnInit(): void {
  }

  addTraining(): any {
    this.trainingService.getTrainingByDate(moment().format('YYYY-MM-DD')).subscribe((res: any) => {
      this.length = res.data.length;

      if (this.length > 0 && !confirm('Istnieje już trening z dzisiejszą datą, chcesz dodać nowy?')) {
          return false;
      }
      this.createTraining();
    });
  }

  createTraining(): void {
    this.trainingService.addTraining(this.userPosition).subscribe(data => {
      this.training = data;
      this.router.navigate([`dashboard/training/${this.training.id}/edit`]);
    });
  }

  back(): void {
    this.location.back();
  }

}
