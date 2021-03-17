import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../../shared/jwt.service';
import { TrainingsService } from '../../../shared/trainings.service';
import { Router } from '@angular/router';
import { Training } from '../../../training';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  trainings;
  training;
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

  addTraining(): void {
    this.trainingService.addTraining().subscribe(res => {
      this.training = res;
      this.router.navigate([`user-profile/training/${this.training.id}/edit`]);
    });
  }
}
