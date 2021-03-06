import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationStateService } from '../../shared/authentication-state.service';
import { JwtService } from '../../shared/jwt.service';
import { TokenAuthService } from '../../shared/token-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth/auth.component.scss']
})

export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  err = null;
  showPassword = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public jwtService: JwtService,
    private tokenAuthService: TokenAuthService,
    private authenticationStateService: AuthenticationStateService,
    public snackBar: MatSnackBar
  ) {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit = () => {
  }

  onSubmit = () => {
    this.jwtService.logIn(this.signinForm.value).subscribe(
      res => {
        this.tokenStorage(res);
      },
      error => {
        this.err = error.error;
        this.snackBar.open(error.message, '🤷‍');
      }, () => {
        this.authenticationStateService.setAuthState(true);
        this.signinForm.reset();
        this.router.navigate(['dashboard']);
      }
    );
  }

  tokenStorage = jwt => {
    this.tokenAuthService.setTokenStorage(jwt.access_token);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}
