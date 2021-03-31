import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import * as moment from 'moment';
import { TrainingsService } from '../trainings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Location } from '@angular/common';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNavComponent implements OnInit {
  @Input() isDarkMode = true;
  @Output() readonly darkModeSwitched = new EventEmitter<boolean>();

  userPosition;
  length;
  training;
  trainings: any;

  constructor(
    public trainingService: TrainingsService,
    private location: Location,
    private snackBar: MatSnackBar,
    public router: Router,
    private geolocation: GeolocationService,
    public profileService: ProfileService,
  ) {
    this.geolocation.subscribe(position => {
      this.userPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    });
  }

  ngOnInit(): void {

  }

  onDarkModeSwitched({checked}: MatSlideToggleChange): void {
    this.darkModeSwitched.emit(checked);
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
}
