import {Component, OnDestroy, OnInit} from '@angular/core';
import {SensorsService} from '../../shared/services/sensors.service';
import {PagePropertiesService} from '../../shared/services/page-properties.service';
import {takeWhile} from 'rxjs/operators';
import {Group} from '../../shared/interfaces/sensor';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private isAlive = true;
  groups: Group[];

  constructor(
    private sensorsService: SensorsService,
    private pagePropertyService: PagePropertiesService
  ) { }

  ngOnInit(): void {
    this.sensorsService.groups()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(data => this.groups = data);

    this.pagePropertyService.set('title', 'Dashboard');
  }


  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
