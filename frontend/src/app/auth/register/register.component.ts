import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JwtService } from '../../shared/jwt.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth/auth.component.scss']
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
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: ['']
    });
  }

  onSubmit(): void {
    this.jwtService.signUp(this.signupForm.value).subscribe(
      response => {
        console.log(response.message)
      },
      error => {
        this.err = JSON.parse(error.error);
      },
      () => {
        this.signupForm.reset();
        this.router.navigate(['auth/login']);
      }
    );
  }

}
