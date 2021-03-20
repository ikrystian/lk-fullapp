import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TrainingsService } from '../../../shared/trainings.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: [
    './create-exercise.component.scss',
    '../../../../assets/styles/components/popup.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class CreateExerciseComponent implements OnInit {
  bodyParts;
  exerciseForm: FormGroup;
  constructor(public trainingService: TrainingsService, private formBuilder: FormBuilder) {

    this.exerciseForm = this.formBuilder.group({
      name: []
    });
  }

  ngOnInit(): void {
    this.trainingService.getBodyParts().subscribe(bodyParts => {
      this.bodyParts = bodyParts;
    });
  }

  createExercise = () => {
    // console.log(this.exerciseForm.value);
  }
}
