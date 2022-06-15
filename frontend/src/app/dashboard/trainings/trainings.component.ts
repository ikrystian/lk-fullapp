import {Component, OnInit} from '@angular/core';
import {TrainingsService} from '../../shared/trainings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { ExerciseService } from '../../shared/exercise-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  userPosition;
  training;
  activeTab = 0;

  constructor(
    public trainingService: TrainingsService,
    public router: Router,
    private exerciseService: ExerciseService,
    private trainingsService: TrainingsService,
    private snackBar: MatSnackBar,
    private geolocation: GeolocationService,
    private activatedRoute: ActivatedRoute) {
    this.geolocation.subscribe(position => {
      this.userPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    });
  }

  ngOnInit(): void {
    this.trainingsService.getTrainings().subscribe((res: any) => {
      this.trainings = res.data;
    });

    const activeTab = this.activatedRoute.snapshot.queryParamMap.get('activeTab');
    if (activeTab) {
      this.activeTab = parseInt(activeTab, 0);
    }

  }

  createTraining(lastTrainingId: number): void {
    this.trainingService.finishTraining(lastTrainingId).subscribe(data => {
      console.log(data);
      this.trainingService.addTraining(this.userPosition).subscribe(response => {
        this.training = response;
        this.exerciseService.clearLocalSeries();
        this.router.navigate([`dashboard/training/${this.training.id}/edit`]);
        this.snackBar.open(`Trening ${data.name} został zakończony`);
      });
    });
  }

}
