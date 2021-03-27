import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  exerciseId = 0;
  bodyParts: any;
  selectedOption;
  showUploadImageForm = false;
  showProgress = false;
  bodyPartId = 0;

  animal: string;
  name: string;

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


  changeExercise(val): void {
    this.exerciseId = parseInt(val, 0);
  }

  // changeTrainingName(event: any): void  {
  //   // !todo update this.training here
  //   if (this.trainingName != event.target.value) {
  //     this.trainingService.changeName(this.training.id, event.target.value).subscribe(res => {
  //       this.openSnackBar('Nazwa treningu została zmieniona', 'ok');
  //     });
  //   }
  // }

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
    console.log(this.exerciseTypes[0].id);
    this.selectedOption = this.exerciseTypes[0].id;
    this.exerciseId =  this.exerciseTypes[0].id;
  }

  openAddExerciseModal = () => {
    const dialogRef  = this.dialog.open(CreateExerciseComponent, {
      width: '350px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.allExerciseTypes.push(result);
    });
  }

}
