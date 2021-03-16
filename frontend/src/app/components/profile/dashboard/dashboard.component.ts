import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../../shared/jwt.service';
import { TrainingsService } from '../../../shared/trainings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  trainings;

  constructor(public trainingService: TrainingsService) { }

  ngOnInit(): void {
    this.getTrainings();
  }

  getTrainings = () => {
    this.trainingService.getTrainings().subscribe((res: any) => {
      this.trainings = res.data;
    });
  }

}
