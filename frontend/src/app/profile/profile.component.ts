import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JwtService } from '../shared/jwt.service';
import { ProfileService } from '../shared/profile.service';

export class User {
  id: number;
  name: string;
  email: string;
}

export class Activity {
  id: number;
  userId: number;
  message: string;
  created: string;
  updatedAt: string;
  createdAt: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  user: User;
  trainings: any;
  activities: Activity[];

  constructor(public jwtService: JwtService, public profileService: ProfileService) {
    this.jwtService.profile().subscribe((res: any) => {
      this.user = res;
      this.profileService.getActivitiesByUserId(this.user.id).subscribe(data => {
        this.activities = data.data;
        console.log(this.activities);
      });

    });
  }

  ngOnInit(): void {
  }

}
