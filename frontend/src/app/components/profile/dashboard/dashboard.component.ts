import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../../shared/jwt.service';
import { TrainingsService } from '../../../shared/trainings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  trainings;

  constructor(public trainingService: TrainingsService, public router: Router) {
  }

  ngOnInit(): void {
    this.getTrainings();
  }

  getTrainings = () => {
    this.trainingService.getTrainings().subscribe((res: any) => {
      this.trainings = res.data;
    });
  }

  addTraining = () => {
      this.trainingService.addTraining().subscribe(res => {
      this.router.navigate([`user-profile/training/${res.id}/edit`]);
    });
  }
}
