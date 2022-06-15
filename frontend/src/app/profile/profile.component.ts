import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common'

export class User {
  id: number;
  name: string;
  email: string;
  images: object;
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
  userImages: any;
  assetsUrl;

  constructor(public profileService: ProfileService, private location: Location, private activatedRoute: ActivatedRoute) {
    this.assetsUrl  = environment.UPLOADED_ASSETS_URL;

    this.profileService.getActivitiesByUserId().subscribe(data => {
      console.log(data);
    });
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.profileService.getLatestImages(userId).subscribe(data => {

      this.userImages = data;
      console.log(this.userImages);
    });
  }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back();
  }

}
