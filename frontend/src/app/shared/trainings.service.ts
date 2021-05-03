import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Series } from '../models/series';
import { Run } from '../models/run';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  API_URL = environment.API_URL;

  private messageSource = new BehaviorSubject(true);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {
  }

  updateProgress(): void {
    this.messageSource.next(true);
  }

  getTrainings(): any {
    return this.http.get(`${this.API_URL}/trainings`);
  }

  getTraining(id: any): any {
    return this.http.get(`${this.API_URL}/trainings/${id}`);
  }

  checkOpenedTraining(): any {
    return this.http.get(`${this.API_URL}/check-opened-training`);
  }

  getTrainingByDate = d => {
    return this.http.get(`${this.API_URL}/trainings/day/` + d);
  }

  addTraining = (data) => {
    return this.http.post(`${this.API_URL}/trainings`, {data});
  }

  getExercisesTypes = () => {
    return this.http.get(`${this.API_URL}/exercises-types`);
  }

  getLastExerciseSum(data): any {
    return this.http.get(`${this.API_URL}/exercises/getTotalInSeries/${data.exercise.id}`);
  }

  createExerciseType = (data) => {
    return this.http.post(`${this.API_URL}/exercises-types`, {data});
  }

  sync(data: Series[]): any {
    return this.http.post(`${this.API_URL}/sync`, {data});
  }

  saveTraining(id: any): any {
    const data = {id};
    return this.http.post(`${this.API_URL}/trainings/workout/save`, data);
  }

  finishTraining(id: any): any {
    const data = {id};
    return this.http.post(`${this.API_URL}/trainings/workout/finish`, data);
  }

  addSeries(series): any {
    return this.http.post(`${this.API_URL}/training/series/add`, series);
  }

  getToralWeightByTraining(trainingId: number): any {
    return this.http.get(`${this.API_URL}/training/total/${trainingId}`);
  }

  changeName(id: number, name: string): any {
    const data = {id, name};
    return this.http.post(`${this.API_URL}/training/change-name`, data);
  }

  getExercises = (trainingId: number, exerciseId: number) => {
    return this.http.get(`${this.API_URL}/training/exercises/${trainingId}/${exerciseId}`);
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

  getStats(): any {
    return this.http.get(`${this.API_URL}/stats`);
  }

  addRun(data: Run): any {
    return this.http.post<Run>(`${this.API_URL}/training/add-run`, data);
  }

  getRuns(): Observable<Run[]> {
    return this.http.get<Run[]>(`${this.API_URL}/get-runs`);
  }

  addCoords(data): any {
    return this.http.post(`${this.API_URL}/add-coords`, data);
  }

  getCoords(): any {
    return this.http.get(`${this.API_URL}/coords`);
  }

}
