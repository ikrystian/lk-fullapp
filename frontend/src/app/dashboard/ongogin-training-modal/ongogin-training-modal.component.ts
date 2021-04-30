import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ongogin-training-modal',
  templateUrl: './ongogin-training-modal.component.html',
  styleUrls: ['./ongogin-training-modal.component.scss']
})
export class OngoginTrainingModalComponent implements OnInit {
  training;

  constructor(
    public dialogRef: MatDialogRef<OngoginTrainingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}
  ngOnInit(): void {
    this.training = this.data[0];
  }


}
