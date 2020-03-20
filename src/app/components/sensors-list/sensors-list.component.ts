import { Component, OnInit } from '@angular/core';

import { SensorsService } from '@myServices/sensors.service';
import { Sensor, SensorGroups } from '@myInterfaces/sensor';
import {PagePropertiesService} from '@myServices/page-properties.service';

@Component({
  selector: 'app-sensors-list',
  templateUrl: './sensors-list.component.html',
  styleUrls: ['./sensors-list.component.scss']
})
export class SensorsListComponent implements OnInit {
  sensors: Sensor[];
  groups: SensorGroups;
  constructor(
      private sensorsService: SensorsService,
      private pagePropertyService: PagePropertiesService
  ) { }

  ngOnInit(): void {
    // this.pageProps.title = 'Dashboard';
    this.sensorsService.sensors().subscribe(data => this.sensors = data);
    this.sensorsService.groups().subscribe(data => this.groups = data);

    setTimeout(() => this.pagePropertyService.set('title', 'Sensors List'));
  }
}
