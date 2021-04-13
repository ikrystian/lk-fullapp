import { Component, OnInit } from '@angular/core';
import { Run } from '../../models/run';
import { TrainingsService } from '../../shared/trainings.service';

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss']
})

export class RunsComponent implements OnInit {
  runs: Run[];

  constructor(private trainingService: TrainingsService) { }

  ngOnInit(): void {
    this.trainingService.getRuns().subscribe(res => {
      console.log(res);
      this.runs = res;
    });
  }

}
