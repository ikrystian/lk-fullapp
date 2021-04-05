import { Injectable } from '@angular/core';
import { Series } from '../models/series';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor() { }

  removeLocalSeries(series: Series): void {
    const LSSeries = (localStorage.getItem('series')) ? JSON.parse(localStorage.getItem('series')) : [];
    LSSeries.unshift(series);
    localStorage.setItem('series', JSON.stringify(LSSeries));
  }

  setLocalSeries(): Series[] {
    return  (localStorage.getItem('series')) ? JSON.parse(localStorage.getItem('series')) : [];
  }

  saveLocalSeries(series: Series[]): void {
    localStorage.setItem('series', JSON.stringify(series));
  }
}
