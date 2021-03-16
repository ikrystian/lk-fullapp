import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TokenAuthService } from './shared/token-auth.service';
import { AuthenticationStateService } from './shared/authentication-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  isLoggedin: boolean;

  constructor(
    public router: Router,
    private tokenAuthService: TokenAuthService,
    public authenticationStateService: AuthenticationStateService,
    private location: Location
  ) {
  }

  back = () => {
    this.location.back();

  }

  ngOnInit() {
    this.authenticationStateService.userAuthState.subscribe(res => {
      this.isLoggedin = res;
    });
  }

  logOut() {
    this.authenticationStateService.setAuthState(false);
    this.tokenAuthService.destroyToken();
    this.router.navigate(['signin']);
  }

}
