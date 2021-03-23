import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TrainingsService } from '../../shared/trainings.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainingComponent implements OnInit {
  training: any;
  displayedColumns: string[] = ['name', 'weight', 'reps', 'seriesTotal'];
  dataSource;
  unique;

  constructor(
    public trainingService: TrainingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.trainingService.getTraining(id).subscribe((res: any) => {
      this.training = res;
      this.dataSource = res.exercises;
    });
  }

  back(): void {
    this.location.back();
  }

  removeTraining = (trainingId: number) => {
    this.trainingService.removeTraining(trainingId).subscribe(res => {
      this.router.navigate(['/dashboard']);
      this.openSnackBar('Trening został usunięty', 'OK');
    });
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }

}
