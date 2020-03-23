import { Component, OnDestroy, OnInit} from '@angular/core';
import {PageProperties} from '../../interfaces/page-properties';
import {PagePropertiesService} from '../../services/page-properties.service';
import {SensorGroups} from '../../interfaces/sensor';
import {SensorsService} from '../../services/sensors.service';
import {takeWhile} from 'rxjs/operators';

/** @title Responsive sidenav */
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnDestroy, OnInit {
  alive = true;
  pageProps: PageProperties = {title: ''};
  groups: SensorGroups;
  constructor(
      private pagePropertyService: PagePropertiesService,
      public sensorsService: SensorsService
  ) { }

  slideMode(): string {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width > 1200 ? 'side' : 'over';
  }

  ngOnInit(): void {
    this.pagePropertyService.get().subscribe(data => this.pageProps = data);
    this.sensorsService.groups()
      .pipe(takeWhile(() => this.alive))
      .subscribe(data => this.groups = data);
  }
  ngOnDestroy(): void {
    this.alive = false;
  }

}
