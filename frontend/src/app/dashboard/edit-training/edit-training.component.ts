import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import {
    CreateExerciseComponent
} from '../../components/profile/create-exercise/create-exercise.component';
import { TrainingsService } from '../../shared/trainings.service';
import { TrainingListModalComponent } from '../training-list-modal/training-list-modal.component';

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
  exerciseId = 1;
  bodyParts: any;
  constructor(
    public trainingService: TrainingsService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    const exerciseId = this.activatedRoute.snapshot.paramMap.get('exerciseId');
    if (exerciseId) {
      this.exerciseId = parseInt(exerciseId, 0);
    }
    this.trainingService.getTraining(id).subscribe((res: any) => {
      this.training = res;
      if (this.training.end) {
        this.router.navigate([`/dashboard/training/${this.training.id}`]);
      }
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
