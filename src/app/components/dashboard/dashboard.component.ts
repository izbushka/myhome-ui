import { Component, OnInit } from '@angular/core';


import { SensorsService } from '@myServices/sensors.service';
import { Sensor, SensorGroups } from '@myInterfaces/sensor';
import {PagePropertiesService} from '@myServices/page-properties.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sensors: Sensor[];
  groups: SensorGroups;
  constructor(
    private sensorsService: SensorsService,
    private pagePropertyService: PagePropertiesService
  ) { }

  ngOnInit(): void {
    this.sensorsService.groups().subscribe(data => this.groups = data);

    setTimeout(() => this.pagePropertyService.set('title', 'Dashboard'));
  }
}
