import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-training-type',
  templateUrl: './choose-training-type.component.html',
  styleUrls: [
    './choose-training-type.component.scss',
    '../../../assets/styles/components/popup.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ChooseTrainingTypeComponent implements OnInit {

  constructor(public trainingTypeDialog: MatDialogRef<ChooseTrainingTypeComponent>) { }

  closeDialog(): void {
    this.trainingTypeDialog.close({type: 1});
  }

  ngOnInit(): void {
  }

}
