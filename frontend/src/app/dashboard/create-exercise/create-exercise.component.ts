import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { TrainingsService } from '../../shared/trainings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

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
    public dialogRef: MatDialogRef<CreateExerciseComponent>) {

    this.exerciseForm = this.formBuilder.group({
      name: [],
      multiplier: [1],
      body_part: [1]
    });
  }

  ngOnInit(): void {
    this.trainingService.getBodyParts().subscribe(bodyParts => {
      this.bodyParts = bodyParts;
    });
  }

  createExercise = () => {
    this.trainingService.createExerciseType(this.exerciseForm.value).subscribe(exercise => {
      if (exercise) {
        this.openSnackBar('Cwiczenie zostało utworzone', 'ok');
        this.dialogRef.close();
      }
    });
  }

  openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }
}
