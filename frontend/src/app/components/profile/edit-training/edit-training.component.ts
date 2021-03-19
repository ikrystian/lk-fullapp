import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../../shared/trainings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    const exerciseId = this.activatedRoute.snapshot.paramMap.get('exerciseId');
    if (exerciseId) {
      this.exerciseId = parseInt(exerciseId, 0);
    }
    this.trainingService.getTraining(id).subscribe((res: any) => {
      this.training = res;
      if (this.training.end) {
        this.router.navigate([`/user-profile/training/${this.training.id}`]);
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
      this.router.navigate([`/user-profile/training/${id}`]);
    });
  }


  changeExercise(val): void {
    this.exerciseId = val;
    this.router.navigate([`/user-profile/training/${this.training.id}/edit/${val}`]);

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
      this.router.navigate(['/user-profile/dashboard']);
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
}
