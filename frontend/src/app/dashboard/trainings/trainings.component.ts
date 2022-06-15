import {Component, OnInit} from '@angular/core';
import {TrainingsService} from '../../shared/trainings.service';
import { ActivatedRoute, Router } from "@angular/router";
import { GeolocationService } from '@ng-web-apis/geolocation';

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
    private trainingsService: TrainingsService,
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

  createTraining(): void {
    this.trainingService.addTraining(this.userPosition).subscribe(data => {
      this.training = data;
      this.router.navigate([`dashboard/training/${this.training.id}/edit`]);
    });
  }

}
