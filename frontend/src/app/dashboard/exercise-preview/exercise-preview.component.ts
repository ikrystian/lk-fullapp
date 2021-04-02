import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateExerciseComponent } from '../create-exercise/create-exercise.component';

@Component({
  selector: 'app-exercise-preview',
  templateUrl: './exercise-preview.component.html',
  styleUrls: ['./exercise-preview.component.scss']
})
export class ExercisePreviewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
