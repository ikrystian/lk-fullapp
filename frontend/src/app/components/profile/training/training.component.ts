import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../../shared/trainings.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  training: any;
  displayedColumns: string[] = ['name', 'weight', 'reps', 'multipler', 'seriesTotal'];
  dataSource;
  unique;

  constructor(public trainingService: TrainingsService, private activatedRoute: ActivatedRoute, private router: Router) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.trainingService.getTraining(id).subscribe((res: any) => {
      this.training = res;
      this.dataSource = res.exercises;
      // this.dataSource = [...new Map(res.exercises.map(item => [item.exercise_type_id, item])).values()];

      if (!this.training.end) {
        this.router.navigate([`/user-profile/training/${this.training.id}/edit`]);
      }
    });
  }

  ngOnInit(): void {
  }

}
