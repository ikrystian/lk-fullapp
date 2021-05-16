import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TrainingsService } from '../../shared/trainings.service';
import { environment } from '../../../environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: [
    './training.component.scss',
    '../../../assets/styles/components/quick-menu.component.scss'
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TrainingComponent {
  training: any;
  ASSETS_URL = environment.UPLOADED_ASSETS_URL;
  dataSource;
  columnsToDisplay = ['name', 'total'];
  expandedElement;

  constructor(
    public trainingService: TrainingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.trainingService.getTraining(id).subscribe((res: any) => {
      this.training = res;
      console.log(res);
      // this.dataSource = res.exercises;
    });

    this.trainingService.getExercisesByTrainingId(id).subscribe(res => {
      this.dataSource = res;
    });
  }

  removeTraining(trainingId: number): any {
    if (!confirm('Na pewno chcesz usunąć trening? Akcja jest nieodwracalna')) {
      return false;
    }
    this.trainingService.removeTraining(trainingId).subscribe(res => {
      this.router.navigate(['/dashboard']);
      this.snackBar.open('Trening został usunięty', 'OK');
    });
  }
}
