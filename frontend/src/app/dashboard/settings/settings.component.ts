import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../../shared/profile.service';
import { environment } from '../../../environments/environment';
import { JwtService } from '../../shared/jwt.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedFile: File;
  userWeight: number;
  profile;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private jwtService: JwtService,
    private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.profileService.getWeight().subscribe(res => {
      this.userWeight = res.data.meta_value;
    });

    this.jwtService.profile().subscribe(res => {
      this.profile = res;
    });
  }

  onFileChange(event): void {
    this.selectedFile = event.target.files[0];
  }

  saveWeight(): void {
    this.profileService.setWeight({data: this.userWeight}).subscribe(res => {
      this.snackBar.open(res.message, res.success);

    });
  }

  onUpload(): void {
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile);
    this.http.post(`${environment.API_URL}/user/add-image`, uploadData).subscribe(event => {
      this.profileService.updateProgress();
      this.snackBar.open('Zdjęcie zostało zaktualizowane', '👌');
    });
  }

  setProgress(e: any): void {
    this.profileService.updateProgressSettings({value: e.value}).subscribe(res => {
      if (!res) {
        return false;
      }

      this.snackBar.open('Ustawienia zostały zapisane');
    });
  }

}
