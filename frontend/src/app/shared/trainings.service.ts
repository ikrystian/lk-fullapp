import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  getTrainings = () => this.http.get(`${this.API_URL}/trainings`);

  getTrainingByDate = d => {
    return this.http.get(`${this.API_URL}/trainings/` + d);
  }

  addTraining = () => {
    return this.http.post(`${this.API_URL}/trainings/`, {});
  }
}
