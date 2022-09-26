import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../shared/trainings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { ExerciseService } from '../../shared/exercise-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/pl';
import * as moment from 'moment';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: [
    './trainings.component.scss',
    '../../../assets/styles/components/quick-menu.component.scss'
  ]
})

export class TrainingsComponent implements OnInit {
  trainings;
  userPosition;
  training;
  links = ['/list'];
  activeTab = 0;
  timeAgo;
  tempDate;
  lastTraining;
  
  constructor(
    public trainingService: TrainingsService,
    public router: Router,
    private exerciseService: ExerciseService,
    private trainingsService: TrainingsService,
    private snackBar: MatSnackBar,
    private geolocation: GeolocationService,
    private activatedRoute: ActivatedRoute,
    intl: TimeagoIntl) {
    this.geolocation.subscribe(position => {
      this.userPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    });

    intl.strings = englishStrings;
    intl.changes.next();    
  }

  ngOnInit(): void {
    this.trainingsService.getLastTraining().subscribe((res: any) => {
      this.training = res;
      console.log(res);
      if(res && res.start) {
        this.training.ago = moment(new Date(this.training.start.replace(/-/g, "/"))).format('X');
      }
    });

    const activeTab = this.activatedRoute.snapshot.queryParamMap.get('activeTab');
    if (activeTab) {
      this.activeTab = parseInt(activeTab, 0);
    }

  }

  createEmptyTraining(): void {
    this.trainingService.addTraining(this.userPosition).subscribe(response => {
      this.training = response;
      this.exerciseService.clearLocalSeries();
      this.router.navigate([`dashboard/training/${this.training.id}/edit`]);
    });
  }

  createTraining(lastTrainingId: number): void {
    if (lastTrainingId === 0) {
      this.createEmptyTraining();
      this.snackBar.open(`Twój pierwszy trening został rozpoczęty!`);
      return;
    }

    this.trainingService.getTraining(lastTrainingId).subscribe(data => {
      if (data.end == null) {
        this.snackBar.open(`Trening ${data.name} został zakończony`);
      } else {
        this.snackBar.open(`Nowy trening został rozpoczęty`);
      }

      this.createEmptyTraining();
    });

  }

}
