import { Component, OnInit } from '@angular/core';

import { SensorsService } from '@myServices/sensors.service';
import { Sensor, SensorGroups } from '@myInterfaces/sensor';
import { SensorsGroupComponent } from '@myComponents/sensors-group/sensors-group.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sensors: Sensor[];
  groups: SensorGroups;
  constructor(
    private sensorsService: SensorsService
  ) { }

  ngOnInit(): void {
    this.sensorsService.sensors().subscribe(data => this.sensors = data)
    this.sensorsService.groups().subscribe(data => this.groups = data)
  }

}
