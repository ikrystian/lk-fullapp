import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { TrainingsService } from '../../shared/trainings.service';
import { CreateExerciseComponent } from '../create-exercise/create-exercise.component';
import { AuthenticationStateService } from '../../shared/authentication-state.service';
import { TokenAuthService } from '../../shared/token-auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: [
    './edit-training.component.scss',
    '../../../assets/styles/components/quick-menu.component.scss'
  ]
})
export class EditTrainingComponent implements OnInit {
  exerciseTypes;
  allExerciseTypes;
  training: any;
  trainingName: string;
  bodyParts: any;
  selectedOption;
  showUploadImageForm = false;
  bodyPartId = 0;
  showChangeNameForm = false;
  name: string;
  timer;

  constructor(
    public trainingService: TrainingsService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private authenticationStateService: AuthenticationStateService,
    private tokenAuthService: TokenAuthService,
    private location: Location,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.trainingService.getTraining(id).subscribe((res: any) => {
      this.training = res;
      this.trainingName = res.name;
      this.updateTime(this.training.start);
    });
  }

  updateTime(from): void {
    const start = moment(new Date(from));
    setInterval(() => {
      const elapsedTime = moment(new Date()).diff(start);
      const time = moment.duration(elapsedTime);

      const hrs = ('0' + time.hours()).slice(-2);
      const mins = ('0' + time.minutes()).slice(-2);
      const secs = ('0' + time.seconds()).slice(-2);

      this.timer = `${hrs}:${mins}:${secs}`;
    }, 1000);
  }

  ngOnInit(): void {
    this.trainingService.getExercisesTypes().subscribe(types => {
      this.exerciseTypes = types;
      this.allExerciseTypes = types;
    });

    this.trainingService.getBodyParts().subscribe(bodyParts => {
      this.bodyParts = bodyParts;
    });
  }

  clearFilters(): void {
    this.exerciseTypes = this.allExerciseTypes;
  }

  toggleImageForm(): void {
    this.showUploadImageForm = !this.showUploadImageForm;
  }

  back(): void {
    this.location.back();
  }

  logOut(): void {
    this.authenticationStateService.setAuthState(false);
    this.tokenAuthService.destroyToken();
    this.router.navigate(['signin']);
  }

  saveWorkout(id): void {
    this.trainingService.saveTraining(id).subscribe(res => {
      this.openSnackBar('Trening został zapisany', 'ok');
    });
  }

  finishWorkout(id): void {
    this.trainingService.finishTraining(id).subscribe(res => {
      this.router.navigate([`/dashboard/training/${id}`]);
    });
  }


  changeExercise(): void {
    this.bodyPartId = this.selectedOption.body_part_id;
  }

  changeTrainingName(event: any): void {
    if (this.trainingName != event.target.value) {
      this.trainingService.changeName(this.training.id, event.target.value).subscribe(res => {
        this.openSnackBar('Nazwa treningu została zmieniona', 'ok');
      });
    }
  }

  removeTraining = (trainingId: number) => {
    if (!confirm('Na pewno chcesz usunąć trening? Akcja jest nieodwracalna')) {
      return false;
    }

    this.trainingService.removeTraining(trainingId).subscribe(res => {
      this.router.navigate(['/dashboard']);
      this.openSnackBar('Trening został usunięty', 'OK');
    });

  }

  openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action);
  }

  filterExercises = (id) => {
    this.exerciseTypes = this.allExerciseTypes.filter(el => el.body_part_id === id);
    this.selectedOption = this.exerciseTypes[0];
  }

  openAddExerciseModal = () => {
    const dialogRef = this.dialog.open(CreateExerciseComponent, {
      width: '350px',
      data: this.bodyParts
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allExerciseTypes.push(result);
        this.exerciseTypes = this.allExerciseTypes;
      }
    });
  }
}
