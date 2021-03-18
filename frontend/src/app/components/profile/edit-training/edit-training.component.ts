import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../../shared/trainings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.scss']
})
export class EditTrainingComponent implements OnInit {
  exerciseTypes;
  training: any;

  exercises: any;
  series: any = [];

  exerciseForm: FormGroup;

  constructor(
    public trainingService: TrainingsService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.trainingService.getTraining(id).subscribe((res: any) => {
      this.training = res;
      if (this.training.end) {
        this.router.navigate([`/user-profile/training/${this.training.id}`]);
      }
      this.createContactForm();
    });
  }

  createContactForm() {
    this.exerciseForm = this.formBuilder.group({
      exercise_type_id: [],
      reps: [],
      weight: [],
      training_id: [this.training.id]
    });
  }

  ngOnInit(): void {
    this.trainingService.getExercisesTypes().subscribe(types => {
      this.exerciseTypes = types;
    });
    if (localStorage.getItem('series')) {
      this.series = JSON.parse(localStorage.getItem('series'));
    }
  }

  finishWorkout(id): void {
    this.trainingService.finishTraining(id).subscribe(res => {
      this.router.navigate([`/user-profile/training/${id}`]);
    });
  }

  change = () => {
    console.log('asd');
  }

  onSubmit = (form: NgForm) => {
    const series = this.exerciseForm.value;
    this.trainingService.addSeries(series).subscribe(res => {
      this.series.unshift(this.exerciseForm.value);
      this.exerciseForm.get('reps').reset();
      this.exerciseForm.get('weight').reset();
      console.log(res);
    });
  }


  onSync() {
    console.log(this.series);
    this.trainingService.addSeries(this.series).subscribe(res => {
      console.log(res);
    });
  }
}
