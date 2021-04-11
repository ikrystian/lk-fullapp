import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TrainingsService } from '../../../shared/trainings.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-run-exercise',
  templateUrl: './run-exercise.component.html',
  styleUrls: ['./run-exercise.component.scss']
})
export class RunExerciseComponent implements OnInit {
  runForm: FormGroup;
  trainingId: number;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private trainingService: TrainingsService,
    private snackBar: MatSnackBar,
  ) {
    this.trainingId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 0);
  }

  ngOnInit(): void {
    this.createRunForm();
  }

  createRunForm(): void {
    this.runForm = this.formBuilder.group({
      trainingId: this.trainingId,
      distance: new FormControl(''),
      time: new FormControl(''),
      weather: new FormControl('1')
    });
  }

  addRun(): any {
    const data = this.runForm.value;
    this.runForm.value.weather = parseInt(this.runForm.value.weather, 0);
    this.trainingService.addRun(data).subscribe(() => {
      this.runForm.reset();
      this.snackBar.open('Bieg został dodany do treningu', '🏃');
    });
  }
}
