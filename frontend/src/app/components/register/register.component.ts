import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../../shared/jwt.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/auth.component.scss']
})

export class RegisterComponent {

  signupForm: FormGroup;
  err = null;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public jwtService: JwtService
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.jwtService.signUp(this.signupForm.value).subscribe(
      res => {
        console.log(res);
      },
      error => {
        this.err = error.error;
      },
      () => {
        this.signupForm.reset();
        this.router.navigate(['signin']);
      }
    );
  }

}
