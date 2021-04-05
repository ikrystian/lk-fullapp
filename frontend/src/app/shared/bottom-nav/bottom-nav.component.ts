import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {TrainingsService} from '../trainings.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {Location} from '@angular/common';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNavComponent implements OnInit {
  @Output() notify = new EventEmitter<any>();

  userPosition;
  length;
  training;
  trainings: any;
  showStats = false;

  constructor(
    public trainingService: TrainingsService,
    private location: Location,
    private snackBar: MatSnackBar,
    public router: Router,
    private geolocation: GeolocationService,
    public profileService: ProfileService
  ) {
    this.geolocation.subscribe(position => {
      this.userPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    });
  }

  ngOnInit(): void {

  }

  toggleStats(): void {
    this.showStats = !this.showStats;
    this.notify.emit(this.showStats);
  }

  addTraining(): any {
    this.trainingService.checkOpenedTraining().subscribe((res) => {
      if (res > 0) {
        alert('Można mieć tylko jeden niezakończony trening');
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
