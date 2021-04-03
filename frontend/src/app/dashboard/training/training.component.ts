import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TrainingsService } from '../../shared/trainings.service';
import { environment } from '../../../environments/environment';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: [
    './training.component.scss',
     '../../../assets/styles/components/quick-menu.component.scss'
  ],
})
export class TrainingComponent implements OnInit {
  training: any;
  displayedColumns: string[] = ['name', 'weight', 'reps'];
  dataSource;
  unique;
  ASSETS_URL = environment.UPLOADED_ASSETS_URL;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65], label: 'Obecny trening' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Poprzedni trening' }
  ];

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

  removeTraining(trainingId: number): any {
    if (!confirm('Na pewno chcesz usunąć trening? Akcja jest nieodwracalna')) {
      return false;
    }
    this.trainingService.removeTraining(trainingId).subscribe(res => {
      this.router.navigate(['/dashboard']);
      this.snackBar.open('Trening został usunięty', 'OK');
    });
  }

  ngOnInit(): void {
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
