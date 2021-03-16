import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  @Input() trainings;
  selectedDate: any;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onSelect = event => {
    this.selectedDate = event;
    console.log(event);
    const date = event.format('YYYY-MM-DD');
    this.router.navigate([`/user-profile/training/${date}`]);
    console.log(event);
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
