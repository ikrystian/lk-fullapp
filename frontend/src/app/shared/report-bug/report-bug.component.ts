import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-report-bug',
  templateUrl: './report-bug.component.html',
  styleUrls: [
    './report-bug.component.scss',
    '../../../assets/styles/components/popup.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ReportBugComponent implements OnInit {

  constructor() { }
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
  }

}
