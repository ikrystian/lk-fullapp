import { Component, OnInit } from '@angular/core';
import { Run } from '../../models/run';
import { TrainingsService } from '../../shared/trainings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-run-details',
  templateUrl: './run-details.component.html',
  styleUrls: [
    './run-details.component.scss',
    '../../../assets/styles/components/quick-menu.component.scss'
  ]
})

export class RunDetailsComponent implements OnInit {
  run: Run;

  constructor(
    private trainingService: TrainingsService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 0);
    this.trainingService.getRun(id).subscribe(res => {
      this.run = res;
    });
  }

  removeRun(id): void {
    this.trainingService.removeRun(id).subscribe(res => {
      if (res === 'removed') {
        this.snackBar.open('Bieg został usunięty');
        this.router.navigate(['/dashboard/']);
      }
    });
  }
}


