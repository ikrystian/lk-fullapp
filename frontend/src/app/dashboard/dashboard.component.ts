import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { TrainingsService } from '../shared/trainings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  trainings;
  training;

  constructor(
    public trainingService: TrainingsService,
    public router: Router,
    private snackBar: MatSnackBar) {
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
      this.openSnackBar('Trening został utworzony', 'ok');
      this.router.navigate([`dashboard/training/${this.training.id}/edit`]);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }
}
