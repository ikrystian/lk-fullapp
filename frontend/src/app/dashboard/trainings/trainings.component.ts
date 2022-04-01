import {Component, OnInit} from '@angular/core';
import {TrainingsService} from '../../shared/trainings.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: [
    './trainings.component.scss',
    '../../../assets/styles/components/quick-menu.component.scss'
  ]
})

export class TrainingsComponent implements OnInit {
  trainings;
  activeTab = 0;

  constructor(
    private trainingsService: TrainingsService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.trainingsService.getTrainings().subscribe((res: any) => {
      this.trainings = res.data;
    });

    const activeTab = this.activatedRoute.snapshot.queryParamMap.get('activeTab');
    if (activeTab) {
      this.activeTab = parseInt(activeTab, 0);
    }

  }

}
