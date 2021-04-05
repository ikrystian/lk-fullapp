import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getActivitiesByUserId(): any {
    return this.http.get(`${this.API_URL}/activities`);
  }

  getUserAvatar(): string {
    return '/assets/images/default-avatar.png';
  }
}
