import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingsService } from '../../shared/trainings.service';
import { MatDialog } from '@angular/material/dialog';
import { TrainingListModalComponent } from '../profile/training-list-modal/training-list-modal.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() trainings;
  selectedDate: any;

  constructor(private router: Router, public trainingService: TrainingsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onSelect = event => {
    this.selectedDate = event;
    this.trainingService.getTrainingByDate(event.format('YYYY-MM-DD')).subscribe((res: any) => {
      if (res.data.length === 1) {
         this.router.navigate([`/user-profile/training/${res.data[0].id}/edit/1`]);
      } else {
        this.openTrainingListModal(res.data);
      }
    });
  }

  openTrainingListModal(res): void {
    const dialogRef = this.dialog.open(TrainingListModalComponent, {
      width: '350px',
      data: {trainings: res}
    });
  }

  trainingDays(d): boolean {
    return this.trainings.find(element => element.training_date === d.format('YYYY-MM-DD').toString());
  }

  dateClass = (d: Date) => {
    return this.trainingDays(d) ? 'active' : 'not-active';
  }

  myDateFilter = (d: Date): boolean => {
    return this.trainingDays(d);
  }
}
