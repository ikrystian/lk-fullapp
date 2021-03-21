import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrainingsService } from '../../shared/trainings.service';
import { TrainingListModalComponent } from '../training-list-modal/training-list-modal.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent<D> implements OnInit {
  @Input() trainings;
  direction = '';
  selectedDate: any;

  constructor(
    private router: Router,
    public trainingService: TrainingsService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onSelect = event => {
    this.selectedDate = event;
    this.trainingService.getTrainingByDate(event.format('YYYY-MM-DD')).subscribe((res: any) => {
      if (res.data.length === 1) {
        this.router.navigate([`/dashboard/training/${res.data[0].id}/edit/1`]);
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


  onSwipe(event): void {
    Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? this.fakeClick('mat-calendar-previous-button') : this.fakeClick('mat-calendar-next-button')) : '';
  }

  fakeClick(className: string): void {
    const element: HTMLElement = document.getElementsByClassName(className)[0] as HTMLElement;
    element.click();
  }

}
