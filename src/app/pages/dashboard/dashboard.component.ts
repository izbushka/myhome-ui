import {Component, OnDestroy, OnInit} from '@angular/core';
import { SensorsService } from '@myServices/sensors.service';
import { Sensor, SensorGroups } from '@myInterfaces/sensor';
import {PagePropertiesService} from '@myServices/page-properties.service';
import {takeWhile} from 'rxjs/operators';
import {Groups} from '../../interfaces/sensor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sensors: Sensor[];
  groups: Groups;
  alive = true;
  constructor(
    private sensorsService: SensorsService,
    private pagePropertyService: PagePropertiesService
  ) { }

  ngOnInit(): void {
    this.sensorsService.groups()
      .pipe(takeWhile(() => this.alive))
      .subscribe(data => this.groups = data);
    setTimeout(() => this.pagePropertyService.set('title', 'Dashboard'));
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
}
