import {
  Component,
  OnInit,
  Output,
  EventEmitter, OnChanges, OnDestroy, ViewEncapsulation
} from '@angular/core';
import { TrainingsService } from '../trainings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Location } from '@angular/common';
import { ProfileService } from '../profile.service';
import { Subscription } from 'rxjs';
import { JwtService } from '../jwt.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
})
export class BottomNavComponent implements OnChanges, OnInit, OnDestroy {
  @Output() notify = new EventEmitter<any>();
  subscription: Subscription;
  userPosition;
  length;
  training;
  trainings: any;
  showStats = false;
  avatar: any;
  profile;
  constructor(
    public trainingService: TrainingsService,
    private location: Location,
    private snackBar: MatSnackBar,
    public router: Router,
    private geolocation: GeolocationService,
    public profileService: ProfileService,
    public jwtService: JwtService
  ) {
    this.geolocation.subscribe(position => {
      this.userPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    });
  }

  ngOnInit(): void{
    this.getAvatar();
    this.subscription = this.profileService.currentMessage.subscribe(() => {
      this.getAvatar();
    });
  }

  ngOnChanges(): void {
    this.getAvatar();
  }

  goToHome(): void {
    this.router.navigate(['/']);
    (this.showStats) ? this.showStats = false : '';
    this.notify.emit(this.showStats);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAvatar(): void {
    this.profileService.getUserAvatar().subscribe(res => {
      this.avatar = environment.UPLOADED_ASSETS_URL + '/backend/public/' + res.avatar;
    });
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

  addRun(): void {
    console.log(`add run`);
  }

  createTraining(): void {
    this.trainingService.addTraining(this.userPosition).subscribe(data => {
      this.training = data;
      this.router.navigate([`dashboard/training/${this.training.id}/edit`]);
    });
  }
}
