import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingsService } from '../../shared/trainings.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  @Input() trainings;
  selectedDate: any;
  constructor(private router: Router, public trainingService: TrainingsService) {
  }

  ngOnInit(): void {
  }

  onSelect = event => {
    this.selectedDate = event;
    this.trainingService.getTrainingByDate(event.format('YYYY-MM-DD')).subscribe((res: any) => {
      this.router.navigate([`/user-profile/training/${res.data[0].id}`]);
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
