import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../shared/trainings.service';
import { ProfileService } from '../../shared/profile.service';
import { Subscription } from 'rxjs';
import { JwtService } from '../../shared/jwt.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  stats;
  subscription: Subscription;

  constructor(public trainingService: TrainingsService, public profileService: ProfileService, public jwtService: JwtService) {
    this.trainingService.getStats().subscribe(res => {
      this.stats = res;
    });

  }

  ngOnInit(): void {

  }

}
