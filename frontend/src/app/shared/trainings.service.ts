import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  constructor(private http: HttpClient) {
  }

  getTrainings = () => {
    return this.http.get('http://localhost:8000/api/trainings');
  }
}
