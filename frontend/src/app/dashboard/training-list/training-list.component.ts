import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TrainingsService } from '../../shared/trainings.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainingListComponent implements OnInit {
  @Input() trainings;
  constructor(
    public trainingService: TrainingsService
  ) {
  }

  ngOnInit(): void {

  }
}
