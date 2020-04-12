import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, pluck} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {SensorsService} from '../../../shared/services/sensors.service';

interface SensorName {
  id: number;
  name: string;
  group: string;
}

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.scss']
})
export class SearchButtonComponent implements OnInit {
  searchForm = new FormGroup({
    text: new FormControl(''),
  });

  searchFocused = false;
  searchFolded = true;
  debouncer: Subject<boolean> = new Subject();
  autoCompleteList: string[];
  sensorNamesList: SensorName[] = [];

  @Output() searchEvent = new EventEmitter<number[]>();
  @Input() group: string;

  constructor(
    private sensorsService: SensorsService
  ) { }

  ngOnInit(): void {
    this.searchForm.valueChanges.pipe(
      debounceTime(200),
      pluck('text')
    ).subscribe(
      text => {
        this.searchEvent.emit(this.searchSensorNames(text));
      }
    );

    this.debouncer.pipe(debounceTime(20)).subscribe(state => {
      if (!this.searchFocused && state) {
        this.resetSearch();
        setTimeout(() => this.getAutocomplete(), 300);
      } else {
        this.autoCompleteList = [];
      }
      this.searchFocused = state;
      this.searchFolded = !this.searchFocused && this.searchForm.get('text').value.length === 0;
    });
  }

  getSensorsNames(): SensorName[] {
    if (!this.sensorNamesList.length) {
      this.sensorsService.getAllSensors(true).forEach(sensor =>
        this.sensorNamesList.push({
          id: sensor.id,
          name: sensor.name,
          group: sensor.group
        })
      );
    }
    return this.sensorNamesList;
  }

  searchSensorNames(text): number[] {
    const ids = [];
    for (const sensor of this.getSensorsNames()) {
      if (sensor.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
        ids.push(sensor.id);
      }
    }
    return ids;
  }

  searchFocus(state: boolean): void {
    this.debouncer.next(state);
  }

  resetSearch(): void {
    this.searchForm.get('text').setValue('');
  }

  getAutocomplete() {
    const auto = {};
    const extra = 'Table';
    let hasExtra = false;
    for (const sensor of this.getSensorsNames()) {
      if (this.group && sensor.group !== this.group) {
        continue;
      }
      if (sensor.name.indexOf(extra) > -1) {
        hasExtra = true;
      }
      const text = sensor.name.split(' ')[0];
      auto[text] = 1 + (auto[text] || 0);
    }
    if (hasExtra) {
      auto[extra] = 100;
    }
    this.autoCompleteList = Object.keys(auto)
      .sort((a, b) => auto[a] < auto[b] ? 1 : (auto[a] > auto[b] ? -1 : 0))
      .slice(0, 5);
  }
}
