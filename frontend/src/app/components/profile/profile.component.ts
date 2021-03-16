import { Component } from '@angular/core';
import { TrainingsService } from '../../shared/trainings.service';
import { JwtService } from '../../shared/jwt.service';

export class User {
  name: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {

  user: User;
  trainingDays = [];
  constructor(public jwtService: JwtService, public trainingService: TrainingsService) {
    this.jwtService.profile().subscribe((res: any) => {
      this.user = res;
    });

    this.getTrainings();
  }

  getTrainings = () => {
    this.trainingService.getTrainings().subscribe((res: any) => {
      res.data.map(el => {
        this.trainingDays.push(el.training_date);
      });
      console.log(this.trainingDays);
    });
  }
}
