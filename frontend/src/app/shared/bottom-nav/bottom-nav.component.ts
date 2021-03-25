import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TrainingsService } from '../trainings.service';
import { JwtService } from '../jwt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {
  userPosition;
  length;
  training;

  constructor(
    public trainingService: TrainingsService,
    private jwtService: JwtService,
    private location: Location,
    private snackBar: MatSnackBar,
    public router: Router,
    private geolocation: GeolocationService,
  ) {
    this.checkTrainings();
    this.geolocation.subscribe(position => {
      this.userPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    });
  }

  ngOnInit(): void { }

  checkTrainings(): any {
    this.trainingService.getTrainingByDate(moment().format('YYYY-MM-DD')).subscribe((res: any) => {
      this.length = res.data.length;
    });
    //   if ( && confirm('Istnieje już trening z dzisiejszą datą, chcesz dodać nowy?')) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
  }

  addTraining(): any {
    if (this.length > 0 && !confirm('Istnieje już trening z dzisiejszą datą, chcesz dodać nowy?')) {
      return false;
    }

    this.trainingService.addTraining(this.userPosition).subscribe(res => {
      this.training = res;
      this.router.navigate([`dashboard/training/${this.training.id}/edit`]);
    });
  }

  back(): void {
    this.location.back();
  }
}
