import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../shared/trainings.service';
import { ProfileService } from '../../shared/profile.service';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import {JwtService} from "../../shared/jwt.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  stats;
  avatar: any;
  subscription: Subscription;

  constructor(public trainingService: TrainingsService, public profileService: ProfileService, public jwtService: JwtService) {
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
    this.jwtService.profile().subscribe(res => {
      if (res.profileimage === 'default-avatar.png') {
        this.avatar = `https://ui-avatars.com/api/?name=${res.name}`;
      } else {
        this.avatar = environment.UPLOADED_ASSETS_URL + res.profileimage;
      }
    });
  }

}
