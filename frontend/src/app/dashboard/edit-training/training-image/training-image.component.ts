import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TrainingsService } from '../../../shared/trainings.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }


  postForm(): void {
    const formData = new FormData();
    formData.append('file', this.file);


    this.http.post(`http://localhost:8000/api/trainings/add-image/${this.training.id}`, formData).subscribe(
      res => {
        const snackBar = this.snackBar.open('Zdjęcie zostało zaktualizowane.', 'zobacz');
        snackBar.onAction().subscribe(() => {
          this.router.navigate([`/dashboard/training/${this.training.id}`]);
        });
      },
      error => {
        this.snackBar.open('Coś poszło nie tak :(', 'shit...');
      }
    );
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;
    }
  }
}
