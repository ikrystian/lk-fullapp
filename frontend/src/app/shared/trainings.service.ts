import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  getTrainings = () => this.http.get(`${this.API_URL}/trainings`);

  getTraining = (id) => this.http.get(`${this.API_URL}/trainings/${id}`);

  getTrainingByDate = d => {
    return this.http.get(`${this.API_URL}/trainings/day/` + d);
  }

  addTraining = () => {
    return this.http.post(`${this.API_URL}/trainings/`, {});
  }
}
