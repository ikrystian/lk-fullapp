import {
  Component,
  OnInit,
  Output,
  EventEmitter, OnChanges, OnDestroy
} from '@angular/core';
import {TrainingsService} from '../trainings.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {Location} from '@angular/common';
import {ProfileService} from '../profile.service';
import {JwtService} from '../jwt.service';
import {environment} from '../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {ExerciseService} from '../exercise-service.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
})
export class BottomNavComponent implements OnChanges, OnInit, OnDestroy {
  @Output() notify = new EventEmitter<any>();
  userPosition;
  length;
  training;
  trainings: any;
  showStats = false;
  avatar: any;
  profile;
  assetsUrl;

  constructor(
    public trainingService: TrainingsService,
    private location: Location,
    private exerciseService: ExerciseService,
    private snackBar: MatSnackBar,
    public router: Router,
    private geolocation: GeolocationService,
    public profileService: ProfileService,
    public jwtService: JwtService,
    public dialog: MatDialog
  ) {
    this.assetsUrl = environment.UPLOADED_ASSETS_URL;
    this.geolocation.subscribe(position => {
      this.userPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    });
  }

  ngOnInit(): void {
    this.getAvatar();
  }

  ngOnChanges(): void {
  }

  goToHome(): void {
    this.router.navigate(['/']);
    this.notify.emit(false);
  }

  ngOnDestroy(): void {
  }

  getAvatar(): void {
    this.jwtService.profile().subscribe(res => {
      if (res.profileimage === 'default-avatar.png') {
        this.avatar = `https://ui-avatars.com/api/?name=${res.name}`;
      } else {
        this.avatar = environment.UPLOADED_ASSETS_URL + res.profileimage;
      }
    });
  }

  toggleStats(): void {
    this.showStats = !this.showStats;
    this.notify.emit(this.showStats);
  }

  createTraining(): void {
    this.trainingService.addTraining(this.userPosition).subscribe(data => {
      this.training = data;
      this.router.navigate([`dashboard/training/${this.training.id}/edit`]);
    });
  }
}
