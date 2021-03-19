import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../../shared/trainings.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  stats;
  constructor(public trainingService: TrainingsService) { }

  ngOnInit(): void {
    this.trainingService.getStats().subscribe(res => {
      this.stats = res;
      console.log(this.stats);
    });
  }

}
