import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../shared/profile.service';


export class User {
  id: number;
  name: string;
  email: string;
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

  constructor(public profileService: ProfileService) {
    this.profileService.getActivitiesByUserId().subscribe(data => {
    });
  }

  ngOnInit(): void {
  }


}
