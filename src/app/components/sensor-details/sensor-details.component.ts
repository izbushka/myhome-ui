import { Component, OnInit } from '@angular/core';
import {SensorsService} from '../../services/sensors.service';
import { ActivatedRoute } from '@angular/router';
import { Sensor } from '../../interfaces/sensor';

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss']
})
export class SensorDetailsComponent implements OnInit {
  sensor: Sensor;
  displayedColumns: string[] = ['change_time', 'state'];


  constructor(
    private sensorsService: SensorsService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.sensorsService.details(+params.get('id'))
        .subscribe(sensor => this.sensor = sensor);
    });
  }

}
