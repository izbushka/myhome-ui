import {Component, OnDestroy, OnInit} from '@angular/core';
import {PagePropertiesService} from '../../shared/services/page-properties.service';
import {SensorsService} from '../../shared/services/sensors.service';
import {ActivatedRoute} from '@angular/router';
import {map, takeWhile} from 'rxjs/operators';
import {Group} from '../../shared/interfaces/sensor';

@Component({
  selector: 'app-sensor-list-page',
  templateUrl: './sensor-list-page.component.html',
  styleUrls: ['./sensor-list-page.component.scss']
})
export class SensorListPageComponent implements OnInit, OnDestroy {
  isAlive = true;
  currentGroup: string;
  groups: Group[];
  visibleSensors: number[];


  constructor(
    private route: ActivatedRoute,
    public sensorsService: SensorsService,
    private pagePropertyService: PagePropertiesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeWhile(() => this.isAlive),
      map(params => params.get('group') === 'all' ? '' : params.get('group'))
    ).subscribe(group => {
      this.currentGroup = group;
      const title = 'Sensors List' + (group ? `: ${group}` : '');
      this.pagePropertyService.set('title', title);
    });

    // don't re-fetch groups on route changes
    // so do not combine this with routeMap by switchMap
    this.sensorsService.groups().pipe(
      takeWhile(() => this.isAlive),
    ).subscribe(data => this.groups = data);
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  onSearch(data: number[]) {
    this.visibleSensors = data;
  }

}
