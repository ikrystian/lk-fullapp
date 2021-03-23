import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-training-list-modal',
  templateUrl: './training-list-modal.component.html',
  styleUrls: [
    './training-list-modal.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class TrainingListModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TrainingListModalComponent>,
    private bottomSheetRef: MatBottomSheetRef<CalendarComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {trainings: any}) {}

  ngOnInit(): void {

  }

  openLink(): void {
    this.bottomSheetRef.dismiss();
  }

}
