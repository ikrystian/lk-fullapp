import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationStateService } from './shared/authentication-state.service';
import { LoaderService } from './loader/loader.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  isLoggedin: boolean;

  constructor(
    public router: Router,
    public authenticationStateService: AuthenticationStateService,
    public loaderService: LoaderService,
  ) {
  }

  ngOnInit(): void {
    this.authenticationStateService.userAuthState.subscribe(res => {
      this.isLoggedin = res;
    });
  }
}
