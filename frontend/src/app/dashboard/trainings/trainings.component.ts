import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../shared/trainings.service';
import { AuthenticationStateService } from '../../shared/authentication-state.service';
import { TokenAuthService } from '../../shared/token-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: [
    './trainings.component.scss',
    '../../../assets/styles/components/quick-menu.component.scss'
  ]
})
export class TrainingsComponent implements OnInit {
  trainings;

  constructor(
    private trainingsService: TrainingsService,
    private authenticationStateService: AuthenticationStateService,
    private tokenAuthService: TokenAuthService,
    private router: Router
  ) {
  }

  logout(): void {
    this.authenticationStateService.setAuthState(false);
    this.tokenAuthService.destroyToken();
    this.router.navigate(['signin']);
  }

  ngOnInit(): void {
    this.trainingsService.getTrainings().subscribe((res: any) => {
      this.trainings = res.data;
    });
  }

}
