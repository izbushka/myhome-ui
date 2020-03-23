import {Component, OnInit, OnDestroy} from '@angular/core';

import {SensorsService} from '@myServices/sensors.service';
import {SensorGroups} from '../../interfaces/sensor';
import {PagePropertiesService} from '@myServices/page-properties.service';
import {ActivatedRoute} from '@angular/router';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-sensors-list',
  templateUrl: './sensors-list.component.html',
  styleUrls: ['./sensors-list.component.scss']
})
export class SensorsListComponent implements OnInit, OnDestroy {
  curGroup: string;
  groups: SensorGroups;
  alive = true;

  constructor(
    private route: ActivatedRoute,
    public sensorsService: SensorsService,
    private pagePropertyService: PagePropertiesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.curGroup = params.get('group'));
    this.sensorsService.groups()
      .pipe(takeWhile(() => this.alive))
      .subscribe(data => this.groups = data);

    setTimeout(() => this.pagePropertyService.set('title', 'Sensors List'));
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
}
