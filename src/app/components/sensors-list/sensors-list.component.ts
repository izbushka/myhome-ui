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
  searchFocused = false;
  search = '';

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
  searchFocus(state: boolean): void {
    this.searchFocused = state;
  }
  resetSearch(): void {
    this.search = '';
  }
  getAutocomplete() {
    const auto = {};
    for (const i in this.groups) {
      if (this.curGroup && i !== this.curGroup) {
        continue;
      }
      for (const sensor of this.groups[i]) {
        const text = sensor.name.split(' ')[0];
        auto[text] = 1 + (auto[text] || 0);
      }
    }
    // console.debug(auto);
    return Object.keys(auto)
      .sort((a, b) => auto[a] < auto[b] ? 1 : (auto[a] > auto[b] ? -1 : 0))
      .slice(0, 4)
    ;
    // return Object.keys(auto).sort((a, b) => auto[a] > auto[b] ? 1 : -1).slice(0, 5);
    // return ['Table', 'Living'];

  }
}
