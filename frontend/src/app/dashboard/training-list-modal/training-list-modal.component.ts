import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-training-list-modal',
  templateUrl: './training-list-modal.component.html',
  styleUrls: [
    './training-list-modal.component.scss',
    '../../../assets/styles/components/popup.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class TrainingListModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TrainingListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
  }

}
