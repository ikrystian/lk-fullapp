import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export class User {
  name: String;
  email: String;
  password: String;
  password_confirmation: String
}

@Injectable({
  providedIn: 'root'
})

export class JwtService {

  constructor(private http: HttpClient) {
  }

  signUp(user: User): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/signup`, user);
  }

  logIn(user: User): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/auth/signin`, user);
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/auth/token-refresh`, {});

  }

  profile(): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/auth/user`);
  }

  // req-password-reset
  reqPasswordReset(data) {
    return this.http.post(`${environment.API_URL}/api/auth/req-password-reset`, data);
  }

  // update password
  updatePassword(data) {
    return this.http.post(`${environment.API_URL}/api/auth/update-password`, data);
  }

}
