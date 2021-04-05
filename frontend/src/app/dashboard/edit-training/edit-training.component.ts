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
  trainingName: string;
  bodyParts: any;
  selectedOption;
  showUploadImageForm = false;
  bodyPartId = 0;
  showChangeNameForm = false;
  name: string;
  timer;
  showTrainingFinishButton = false;

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
    this.trainingService.saveTraining(id).subscribe(res => {
      this.snackBar.open('Trening został zapisany', 'ok');
    });
    const data = JSON.parse(localStorage.getItem('series'));
    this.trainingService.sync(data).subscribe(res => {
      this.snackBar.open('Dane zostały wysłane', 'ok');
      localStorage.removeItem('series');
    });
  }

  finishWorkout(id): boolean {
    if (!confirm('Na pewno chcesz zakończyć trening? Jego edycja później będzie niemożliwa')) {
      return false;
    }
    const data = JSON.parse(localStorage.getItem('series'));
    this.trainingService.sync(data).subscribe(res => {
      this.trainingService.finishTraining(id).subscribe(() => {
        localStorage.removeItem('series');
        this.router.navigate([`/dashboard/training/${id}`]);
      });
    });
  }

  changeExercise(): void {
    this.bodyPartId = this.selectedOption.body_part_id;
    this.trainingService.changeMessage();
  }

  changeTrainingName(event: any): void {
    if (this.trainingName !== event.target.value) {
      this.trainingService.changeName(this.training.id, event.target.value).subscribe(res => {
        this.snackBar.open('Nazwa treningu została zmieniona', 'ok');
      });
    }
  }

  removeTraining = (trainingId: number) => {
    if (!confirm('Na pewno chcesz usunąć trening? Akcja jest nieodwracalna')) {
      return false;
    }

    this.trainingService.removeTraining(trainingId).subscribe(res => {
      this.router.navigate(['/dashboard']);
      localStorage.removeItem('series');
      this.snackBar.open('Trening został usunięty', 'OK');
    });

  }

  filterExercises(id): void {
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
