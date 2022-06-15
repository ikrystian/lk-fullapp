import { Injectable } from '@angular/core';
import { Series } from '../models/series';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  removeLocalSeries(series: Series): void {
    const LSSeries = (localStorage.getItem('series')) ? JSON.parse(localStorage.getItem('series')) : [];
    LSSeries.unshift(series);
    localStorage.setItem('series', JSON.stringify(LSSeries));
  }

  addSeries(series): any {
    return this.http.post(`${this.API_URL}/training/series/add`, series);
  }

  removeSeries(series): any {
    return this.http.post(`${this.API_URL}/remove-series`, series);
  }

  clearLocalSeries(): void {
    localStorage.removeItem('series');
  }

  setLocalSeries(): Series[] {
    return  (localStorage.getItem('series')) ? JSON.parse(localStorage.getItem('series')) : [];
  }

  saveLocalSeries(series: Series[]): void {
    localStorage.setItem('series', JSON.stringify(series));
  }
}
