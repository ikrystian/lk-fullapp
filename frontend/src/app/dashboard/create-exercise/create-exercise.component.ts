import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { TrainingsService } from '../../shared/trainings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: [
    './create-exercise.component.scss',
    '../../../assets/styles/components/popup.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class CreateExerciseComponent implements OnInit {
  bodyParts;
  exerciseForm: FormGroup;

  constructor(
    public trainingService: TrainingsService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {

    this.exerciseForm = this.formBuilder.group({
      name: [],
      multiplier: [1],
      body_part: [1],
      exercise_type: [1]
    });
  }

  ngOnInit(): void {
    this.bodyParts = this.data;
  }

  createExercise = () => {
    this.trainingService.createExerciseType(this.exerciseForm.value).subscribe(exercise => {
      if (exercise) {
        this.openSnackBar('Cwiczenie zostało utworzone', '💪');
        this.dialogRef.close(exercise);
      }
    });
  }

  openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action);
  }
}
