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

  getTraining(id: any) {
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

  changeName(id: number, name: string) {
    const data = {id, name};
    return this.http.post(`${this.API_URL}/training/change-name`, data);
  }

  getExercises = (trainingId: number, exerciseId: number) => {
    return this.http.get(`${this.API_URL}/training/exercises/${trainingId}/${exerciseId}`);
  }

  getAverageWeightForExercise = (exerciseID: number, trainingId: number) => {
    return this.http.get(`${this.API_URL}/exercises/average/${exerciseID}/${trainingId}`);
  }

  getUniqueExercises = (trainingId: number) => {
    return this.http.get(`${this.API_URL}/exercises/unique/${trainingId}`);
  }

  removeTraining = (trainingId: number) => {
    return this.http.delete(`${this.API_URL}/trainings/${trainingId}`);
  }

  removeExercise = (seriesId: number) => {
    return this.http.delete(`${this.API_URL}/exercises/${seriesId}`);
  }

  getBodyParts = () => {
    return this.http.get(`${this.API_URL}/get-body-parts`);
  }
}
