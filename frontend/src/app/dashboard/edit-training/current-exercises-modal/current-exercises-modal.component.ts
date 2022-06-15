import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExerciseService } from '../../../shared/exercise-service.service';
import { Series } from '../../../models/series';

@Component({
  selector: 'app-current-exercises-modal',
  templateUrl: './current-exercises-modal.component.html',
  styleUrls: ['./current-exercises-modal.component.scss']
})
export class CurrentExercisesModalComponent implements OnInit {

  series: Series[];

  currentItem: any;

  constructor(
    public exerciseService: ExerciseService,
    public dialogRef: MatDialogRef<CurrentExercisesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit(): void {
    const s = this.exerciseService.setLocalSeries();
    this.series = s.filter((element, index) => {
      return s.indexOf(element) === index;
    });
  }

  chooseExercise(): void {
    this.dialogRef.close(143);
  }

}
