import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { TrainingsService } from '../../shared/trainings.service';
import { CreateExerciseComponent } from '../create-exercise/create-exercise.component';
import { AuthenticationStateService } from '../../shared/authentication-state.service';
import { TokenAuthService } from '../../shared/token-auth.service';
import * as moment from 'moment';
import { Training } from '../../training';
import { ExercisePreviewComponent } from '../exercise-preview/exercise-preview.component';
import { ExerciseService } from '../../shared/exercise-service.service';
import { CurrentExercisesModalComponent } from './current-exercises-modal/current-exercises-modal.component';

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
    private exerciseService: ExerciseService,
    private ref: ChangeDetectorRef
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.trainingService.getTraining(id).subscribe((res: any) => {
      this.training = res;
      this.updateTime(this.training.start);
    });
  }

  toggleRestIndicator(show: boolean): void {
    setTimeout(() => {
      new Audio('/assets/sounds/notification.mp3').play();
    }, 30000);
  }

  updateTime(from): void {
    const start = moment(new Date(from.replace(/-/g, "/")));
    const now = moment(new Date());
    setInterval(() => {
      const elapsedTime = moment(new Date()).diff(start);
      const time = moment.duration(elapsedTime);
      const hrs = ('0' + (time.hours() - 2)).slice(-2) ;
      const min = ('0' + time.minutes()).slice(-2);
      const secs = ('0' + time.seconds()).slice(-2);
      this.timer = `${hrs}:${min}:${secs}`;
    }, 1000);
  }

  ngOnInit(): void {
    if (!localStorage.getItem('bodyParts')) {
      this.trainingService.getBodyParts().subscribe(bodyParts => {
        localStorage.setItem('bodyParts', JSON.stringify(bodyParts));
        this.bodyParts = bodyParts;
      });
    }
    this.bodyParts = JSON.parse(localStorage.getItem('bodyParts'));

    if (!localStorage.getItem('types')) {
      this.trainingService.getExercisesTypes().subscribe(types => {
        localStorage.setItem('types', JSON.stringify(types));
        this.exerciseTypes = types;
        this.allExerciseTypes = this.exerciseTypes;
      });
    }

    this.exerciseTypes = JSON.parse(localStorage.getItem('types'));
    this.allExerciseTypes = this.exerciseTypes;
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

  markAsFav(exercise: any): void {
    console.log(exercise);
  }

  showCurrentExercisesModal(): void {
    const dialogRef = this.dialog.open(CurrentExercisesModalComponent, {
      restoreFocus: false,
      width: '350px',
      data: this.training
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return false;
      }

      this.findExercise(result);
    });
  }

  finishWorkout(id): any {
    this.trainingService.finishTraining(id).subscribe(data => {
      this.exerciseService.clearLocalSeries();
      this.router.navigate([`dashboard/training/${id}`]);
      this.snackBar.open(`Trening ${data.name} został zakończony`);
    });
  }

  changeExercise(): void {
    this.bodyPartId = this.selectedOption.body_part_id;
    this.trainingService.updateProgress();
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

  findExercise(id: number): void {
    this.clearFilters();
    this.exerciseTypes = this.allExerciseTypes.filter(el => el.id === id);
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
