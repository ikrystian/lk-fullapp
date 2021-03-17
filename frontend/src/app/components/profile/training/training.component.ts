import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../../shared/trainings.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  training: any;

  constructor(public trainingService: TrainingsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.trainingService.getTraining(id).subscribe((res: any) => {
      console.log(res);
      this.training = res.data[0];
    });
  }

}
