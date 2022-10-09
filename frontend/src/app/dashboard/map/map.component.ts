import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../shared/trainings.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lat = 52.192328652831954;
  lng = 20.988048920484538;

  latlng = [];

  constructor(private trainingService: TrainingsService) {
  }
  ngOnInit(): void {
    this.trainingService.getCoords().subscribe(res => {
      res.forEach(el => {
        this.latlng.push([parseFloat(el.lat), parseFloat(el.lng)]);
      });
    });
  }
}
