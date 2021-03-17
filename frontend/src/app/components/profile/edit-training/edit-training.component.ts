import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../../shared/trainings.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.scss']
})
export class EditTrainingComponent implements OnInit {
  exerciseTypes;
  selectedValue: string;
  training: any;

  constructor(public trainingService: TrainingsService, private activatedRoute: ActivatedRoute, public router: Router) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.trainingService.getTraining(id).subscribe((res: any) => {
      this.training = res;
      if (this.training.end) {
        this.router.navigate([`/user-profile/training/${this.training.id}`]);
      }
    });
  }


  ngOnInit(): void {
    this.trainingService.getExercisesTypes().subscribe(types => {
      this.exerciseTypes = types;
    });
  }

  finishWorkout(id): void {
    this.trainingService.finishTraining(id).subscribe(res => {
      this.router.navigate([`/user-profile/training/${id}`]);
    });
  }

  change = () => {
    console.log('asd');
  }
}
