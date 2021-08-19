import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {TrainingsService} from '../../shared/trainings.service';
import {CreateExerciseComponent} from '../create-exercise/create-exercise.component';
import {AuthenticationStateService} from '../../shared/authentication-state.service';
import {TokenAuthService} from '../../shared/token-auth.service';
import * as moment from 'moment';
import {Training} from '../../training';
import {ExercisePreviewComponent} from '../exercise-preview/exercise-preview.component';
import {ExerciseService} from '../../shared/exercise-service.service';

// !todo - handle errors from servers
// !todo - change setinterval to rxsj

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
  training: Training;
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
    public dialog: MatDialog,
    private exerciseService: ExerciseService
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.trainingService.getTraining(id).subscribe((res: any) => {
      this.training = res;
      this.updateTime(this.training.start);
    });
  }

  updateTime(from): void {
    const start = moment(new Date(from));
    setInterval(() => {
      const elapsedTime = moment(new Date()).diff(start);
      const time = moment.duration(elapsedTime);

      // minus 2 hours it's a fix for backend time issue,it will be changed after moved to .net core
      const hrs = ('0' + (time.hours() - 2)).slice(-2);
      const min = ('0' + time.minutes()).slice(-2);
      const secs = ('0' + time.seconds()).slice(-2);
      this.timer = `${hrs}:${min}:${secs}`;
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

  showExercise(type): void {
    this.dialog.open(ExercisePreviewComponent, {
      width: '350px',
      data: type
    });
  }

  clearFilters(): void {
    this.exerciseTypes = this.allExerciseTypes;
  }

  toggleImageForm(): void {
    this.showUploadImageForm = !this.showUploadImageForm;
  }

  saveWorkout(id): void {
    this.trainingService.saveTraining(id).subscribe(() => {
      this.snackBar.open('Trening został zapisany', 'ok');
    });
    const data = this.exerciseService.setLocalSeries();
    this.trainingService.sync(data).subscribe(() => {
      this.snackBar.open('Dane zostały wysłane', 'ok');
      this.exerciseService.clearLocalSeries();
    });
  }

  markAsFav(exercise: any): void {
    console.log(exercise);
  }

  finishWorkout(id): any {
    this.trainingService.getTraining(id).subscribe(res => {
      if (res.user_image === null) {
        this.snackBar.open('Nie możesz zakońćzyć treningu bez dodania zdjęcia', 'ok');
        this.showUploadImageForm = true;
        return false;
      }

      if (!confirm('Na pewno chcesz zakończyć trening? Jego edycja później będzie niemożliwa')) {
        return false;
      }

      const data = this.exerciseService.setLocalSeries();
      this.trainingService.sync(data).subscribe(() => {
        this.trainingService.finishTraining(id).subscribe(() => {
          this.exerciseService.clearLocalSeries();
          localStorage.removeItem('records');
          this.router.navigate([`/dashboard/training/${id}`]);
        });
      });
    });
  }

  changeExercise(): void {
    this.bodyPartId = this.selectedOption.body_part_id;
    this.trainingService.updateProgress();
    console.log(this.selectedOption);
  }

  changeTrainingName(event: any): void {
    if (event.target.classList.contains('ng-dirty')) {
      this.trainingService.changeName(this.training.id, event.target.value).subscribe(() => {
        this.snackBar.open('Nazwa treningu została zmieniona', 'ok');
      });
    }
  }

  removeTraining(trainingId: number): boolean {
    if (!confirm('Na pewno chcesz usunąć trening? Akcja jest nieodwracalna')) {
      return false;
    }

    this.trainingService.removeTraining(trainingId).subscribe(() => {
      this.router.navigate(['/dashboard']);
      this.exerciseService.clearLocalSeries();
      this.snackBar.open('Trening został usunięty', 'OK');
    });

  }

  filterExercises(id: number): void {
    this.exerciseTypes = this.allExerciseTypes.filter(el => el.body_part_id === id);
    this.selectedOption = this.exerciseTypes[0];
  }

  openAddExerciseModal(): void {
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
