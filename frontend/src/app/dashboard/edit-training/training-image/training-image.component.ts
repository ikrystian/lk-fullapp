import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {TrainingsService} from '../../../shared/trainings.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-training-image',
  templateUrl: './training-image.component.html',
  styleUrls: ['./training-image.component.scss']
})
export class TrainingImageComponent {
  @Input() training: any;
  selectedFile: File = null;
  file;
  labelText = 'Kliknij aby wybrać zdjęcie';
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

  postForm(): void {
    const formData = new FormData();
    formData.append('file', this.file);

    this.http.post(`${environment.API_URL}/trainings/add-image/${this.training.id}`, formData).subscribe(
      (data) => {
        console.log(data);
        const snackBar = this.snackBar.open('Zdjęcie zostało zaktualizowane.', 'zobacz');
        snackBar.onAction().subscribe(() => {
          this.router.navigate([`/dashboard/training/${this.training.id}`]);
        });
      },
      () => {
        this.snackBar.open('Coś poszło nie tak :(', 'shit...');
      }
    );
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;
      this.labelText = file.name;
    }
  }
}
