import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  getTrainings = () => this.http.get(`${this.API_URL}/trainings`);

  getTraining(id: string) {
    return this.http.get(`${this.API_URL}/trainings/${id}`);
  }

  getTrainingByDate = d => {
    return this.http.get(`${this.API_URL}/trainings/day/` + d);
  }

  addTraining = () => {
    return this.http.post(`${this.API_URL}/trainings/`, {});
  }

  getExercisesTypes = () => {
    return this.http.get(`${this.API_URL}/exercises-types`);
  }

  finishTraining(id: any) {
    const data = {id};
    return this.http.post(`${this.API_URL}/trainings/workout/finish`, data);
  }

  addSeries(series) {
    return this.http.post(`${this.API_URL}/training/series/add`, series);
  }
}
