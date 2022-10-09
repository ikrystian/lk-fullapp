import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';
import { JwtService } from '../shared/jwt.service';
import { TrainingsService } from '../shared/trainings.service';

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
  profile;
  avatar;
  stats;
  public id: string;

  constructor(public profileService: ProfileService,
              public trainingService: TrainingsService,
              public jwtService: JwtService,
              private location: Location,
              private activatedRoute: ActivatedRoute) {
    this.assetsUrl = environment.UPLOADED_ASSETS_URL;

    this.profileService.getActivitiesByUserId().subscribe(data => {
    });

    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.profileService.getLatestImages(userId).subscribe(data => {
      this.userImages = data;
    });

    this.trainingService.getStats().subscribe(res => {
      this.stats = res;
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProfileInfo(id);
    this.getAvatar(id);
  }

  back(): void {
    this.location.back();
  }

  getProfileInfo(id: string): void {
    this.profileService.getProfileInfoById(id).subscribe(res => {
      this.profile = res;
      if (res.profileimage  === 'default-avatar.png') {
        this.profile.avatar = `https://ui-avatars.com/api/?name=${res.name}`;
      } else {
        this.profile.avatar = environment.UPLOADED_ASSETS_URL + res.profileimage;
      }
    });
  }

  getAvatar(id: string): void {
    this.profileService.getUserAvatarById(id).subscribe(res => {
      if (res.avatar === 'default-avatar.png') {
        this.avatar = `https://ui-avatars.com/api/?name=${res.avatar}`;
      } else {
        this.avatar = environment.UPLOADED_ASSETS_URL + res.avatar;
      }
    });
    // this.jwtService.profile().subscribe(res => {
    //   this.profile = res;
    //   if (res.profileimage === 'default-avatar.png') {
    //     this.avatar = `https://ui-avatars.com/api/?name=${res.name}`;
    //   } else {
    //     this.avatar = environment.UPLOADED_ASSETS_URL + res.profileimage;
    //   }
    // });
  }

}
