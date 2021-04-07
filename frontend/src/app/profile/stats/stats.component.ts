import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../shared/trainings.service';
import { ProfileService } from '../../shared/profile.service';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  stats;
  useravatar: any;
  subscription: Subscription;
  ASSETS_URL = environment.UPLOADED_ASSETS_URL;

  constructor(public trainingService: TrainingsService, public profileService: ProfileService) {
    this.trainingService.getStats().subscribe(res => {
      this.stats = res;
    });
  }

  ngOnInit(): void {
    this.getAvatar();
    this.subscription = this.profileService.currentMessage.subscribe(() => {
      this.getAvatar();
    });
  }

  getAvatar(): void {
    this.profileService.getUserAvatar().subscribe(res => {
      this.useravatar = '/backend/public/' + res.avatar;
    });
  }

}
