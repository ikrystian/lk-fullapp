import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export class User {
  name: string;
  email: string;
  password: string;
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

  profile(): any {
    return this.http.get(`${environment.API_URL}/auth/user`);
  }

  // req-password-reset
  reqPasswordReset(data): Observable<any> {
    console.log(data);
    return this.http.post(`${environment.API_URL}/auth/req-password-reset`, data);
  }

  // update password
  updatePassword(data): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/update-password`, data);
  }

}
