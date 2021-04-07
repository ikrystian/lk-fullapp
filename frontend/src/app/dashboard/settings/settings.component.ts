import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../../shared/profile.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedFile: File;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private profileService: ProfileService) {
  }

  ngOnInit(): void {
  }

  onFileChange(event): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile);
    this.http.post(`${environment.API_URL}/user/add-image`, uploadData).subscribe(event => {
      this.profileService.updateProgress();
      this.snackBar.open('Zdjęcie zostało zaktualizowane', '👌');
    });
  }

}
