import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../shared/trainings.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: [
    './trainings.component.scss',
    '../../../assets/styles/components/quick-menu.component.scss'
  ]
})

export class TrainingsComponent implements OnInit {
  trainings;

  constructor(
    private trainingsService: TrainingsService) {
  }

  ngOnInit(): void {
    this.trainingsService.getTrainings().subscribe((res: any) => {
      this.trainings = res.data;
    });
  }

}
