import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // users will be not happy about that, but who cares
    new Audio('/assets/sounds/keanu.mp3').play();
  }
}
