import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  API_URL = environment.API_URL;

  private messageSource = new BehaviorSubject(true);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {
  }

  updateProgress(): void  {
    this.messageSource.next(true);
  }

  getActivitiesByUserId(): any {
    return this.http.get(`${this.API_URL}/activities`);
  }

  getUserAvatar(): any {
    return this.http.get(`${this.API_URL}/getuseravatar`);
  }
}
