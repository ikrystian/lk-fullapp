import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../../shared/trainings.service';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.scss']
})
export class EditTrainingComponent implements OnInit {
  exerciseTypes;
  selectedValue: string;

  constructor(private trainingService: TrainingsService) {
  }

  ngOnInit(): void {
    this.trainingService.getExercisesTypes().subscribe(types => {
      this.exerciseTypes = types;
    });
  }

  change = () => {
    console.log('asd');
  }
}
