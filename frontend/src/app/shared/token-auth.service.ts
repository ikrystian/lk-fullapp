import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TokenAuthService {

  private tokenIssuer = {
    login: `${environment}/api/auth/signin`,
    register: `${environment}/api/auth/singup`
  };

  constructor() {
  }

  setTokenStorage = token => {
    localStorage.setItem('auth_token', token);
  }

  isLoggedIn = () => !!this.getJwtToken();
  getJwtToken = () => localStorage.getItem('auth_token');

  validateToken = () => {
    const token = this.getJwtToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.tokenIssuer).indexOf(payload.iss) > -1;
      }
    } else {
      return false;
    }
  }

  payload = token => {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  isSignedin = () => this.validateToken();

  destroyToken = () => localStorage.removeItem('auth_token');
}
