import {
  Component,
  OnInit,
  Output,
  EventEmitter, OnChanges, OnDestroy, ViewEncapsulation
} from '@angular/core';
import {TrainingsService} from '../trainings.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {Location} from '@angular/common';
import {ProfileService} from '../profile.service';
import {Subscription} from 'rxjs';
import {JwtService} from '../jwt.service';
import {environment} from '../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {ChooseTrainingTypeComponent} from '../../dashboard/choose-training-type/choose-training-type.component';
import {OngoginTrainingModalComponent} from '../../dashboard/ongogin-training-modal/ongogin-training-modal.component';
import {ExerciseService} from '../exercise-service.service';

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

  addTraining(): any {
    this.trainingService.checkOpenedTraining().subscribe((res) => {
      if (res.length === 0) {
        this.traingTypeDialog();
        return;
      }

      const ongioingTraining = this.dialog.open(OngoginTrainingModalComponent, {panelClass: '', data: res});
      ongioingTraining.afterClosed().subscribe((resFromOngoingDialog) => {

        if (resFromOngoingDialog === 1) {
          this.finishWorkout(res[0].id);
        }
        if (resFromOngoingDialog === 2) {
          this.router.navigate([`/dashboard/training/${res[0].id}/edit`]);
        }

      });


    });
  }

  finishWorkout(id): boolean {
    if (!confirm('Na pewno chcesz zakończyć trening? Jego edycja później będzie niemożliwa')) {
      return false;
    }
    const data = this.exerciseService.setLocalSeries();
    this.trainingService.sync(data).subscribe(() => {
      this.trainingService.finishTraining(id).subscribe(() => {
        this.exerciseService.clearLocalSeries();
        localStorage.removeItem('records');
        this.traingTypeDialog();
      });
    });
  }

  traingTypeDialog(): void {
    const trainingTypeDialog = this.dialog.open(ChooseTrainingTypeComponent, {panelClass: ['modal', 'modal--choose-training-type']});
    trainingTypeDialog.afterClosed().subscribe((resFromDialog) => {
      console.log(resFromDialog);
      if (resFromDialog.type === 1) {
        this.createTraining();
      }
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
