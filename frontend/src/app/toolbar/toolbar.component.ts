import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationStateService } from '../shared/authentication-state.service';
import { TokenAuthService } from '../shared/token-auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;

  constructor(
    public router: Router,
    public authenticationStateService: AuthenticationStateService,
    private location: Location,
    private tokenAuthService: TokenAuthService) {
  }

  ngOnInit(): void {
  }

  back(): void {
    this.router.navigate(['user-profile/dashboard']);
  }

  logOut(): void {
    this.authenticationStateService.setAuthState(false);
    this.tokenAuthService.destroyToken();
    this.router.navigate(['signin']);
  }

}
