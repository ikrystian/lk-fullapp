import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { TrainingsService } from '../../shared/trainings.service';
import { CreateExerciseComponent } from '../create-exercise/create-exercise.component';
import { AuthenticationStateService } from '../../shared/authentication-state.service';
import { TokenAuthService } from '../../shared/token-auth.service';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.scss']
})
export class EditTrainingComponent implements OnInit {
  exerciseTypes;
  allExerciseTypes;
  training: any;
  average: any;
  exercises: any;
  trainingName: string;
  exerciseId = 0;
  bodyParts: any;
  total;
  selectedOption;
  showUploadImageForm = false;
  showProgress = false;
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
    const exerciseId = this.activatedRoute.snapshot.paramMap.get('exerciseId');
    if (exerciseId) {
      this.exerciseId = parseInt(exerciseId, 0);
      this.selectedOption = this.exerciseId;
    }
    this.trainingService.getTraining(id).subscribe((res: any) => {
      this.training = res;
      this.trainingName = res.name;
    });
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

  finishWorkout(id): void {
    this.trainingService.finishTraining(id).subscribe(res => {
      this.router.navigate([`/dashboard/training/${id}`]);
    });
  }


  changeExercise(val): void {
    this.exerciseId = val;
    this.router.navigate([`/dashboard/training/${this.training.id}/edit/${val}`]);

  }

  changeTrainingName = (event: any) => {
    // !todo update this.training here
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
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }

  filterExercises = (id) => {
    this.exerciseTypes = this.allExerciseTypes.filter(el => el.body_part_id === id);
  }

  openAddExerciseModal = () => {
    this.dialog.open(CreateExerciseComponent, {
      width: '350px',
    });
  }
}
