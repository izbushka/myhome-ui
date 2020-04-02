import {Component, OnInit, OnDestroy} from '@angular/core';

import {SensorsService} from '../../services/sensors.service';
import {Groups} from '../../interfaces/sensor';
import {PagePropertiesService} from '../../services/page-properties.service';
import {ActivatedRoute} from '@angular/router';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-sensors-list',
  templateUrl: './sensors-list.component.html',
  styleUrls: ['./sensors-list.component.scss']
})
export class SensorsListComponent implements OnInit, OnDestroy {
  curGroup: string;
  groups: Groups;
  alive = true;
  visibleSensors: Array<number>;

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

  onSearch(data: Array<number>) {
    this.visibleSensors = data;
  }
}
