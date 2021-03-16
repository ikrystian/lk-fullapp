import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  @Input() trainings;
  selectedDate: any;
  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect = event => {
    this.selectedDate = event;
    console.log('asd');
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
