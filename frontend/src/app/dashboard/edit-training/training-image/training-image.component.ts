import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TrainingsService } from '../../../shared/trainings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-training-image',
  templateUrl: './training-image.component.html',
  styleUrls: ['./training-image.component.scss']
})
export class TrainingImageComponent implements OnInit {
  @Input() training: any;
  selectedFile: File = null;
  file;
  form = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(
    private trainingsService: TrainingsService,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }


  postForm(): void {
    const formData = new FormData();
    formData.append('file', this.file);
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: false,
    };

    const req = new HttpRequest('POST', `http://localhost:8000/api/trainings/add-image/${this.training.id}`, formData, options);
    this.http.request(req).subscribe(res => {
      this.snackBar.open('Zdjęcie zostało zaktualizowane.', 'zajebiście');
    });
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;
    }
  }

  openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action, {
      duration: 20000,
    });
  }

}
