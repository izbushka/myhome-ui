import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';​

import { Sensor, SensorGroups, SensorGraphPoint } from '../interfaces/sensor';

interface ServerSensorsData {
    timestamp: number;
    sensors: Sensor[];
}

@Injectable({
  providedIn: 'root'
})

export class SensorsService {
  private sensorsUrl = 'http://11.230.0.2/sensors/states'; // URL to web api
  private lastUpdate: Date;
  private sensorsSubject: BehaviorSubject<Sensor[]> = new BehaviorSubject([]);
  private groupsSubject: BehaviorSubject<SensorGroups> = new BehaviorSubject({});

  private lastChange: string;

  constructor(
    private http: HttpClient
  ) {
    this.update();
    // interval(3000).subscribe(() => this.update());
  }
  update(): void {
    this._monitorSensors();
  }
  sensors(): BehaviorSubject < Sensor[] > {
    return this.sensorsSubject;
  }
  groups(): BehaviorSubject <SensorGroups> {
    return this.groupsSubject;
  }
  details(id: number): Observable <Sensor> {
    return this.http.get<Sensor>(this.sensorsUrl + '/' + id);
  }
  graph(id: number, period: string): Observable <SensorGraphPoint[]>  {
    // https://rpi.xvv.be/sensors/81/graph/day?
    return this.http.get<SensorGraphPoint[]>(this.sensorsUrl + '/../' + id + '/graph/' + period);
  }
  getGroupIcon(name: string): string {
    const icons = {
      lock: 'lock',
      'light-switch': 'lightbulb_outline',
      'power-switch': 'power',
      'light-btn': 'wb_incandescent',
      alarm: 'security',
      motion: 'remove_red_eye',
      sensors: 'filter_tilt_shift',

      default: 'security'

    };
    return (icons[name]) ? icons[name] : icons.default;
  }

  _monitorSensors(): void {
    this._getSensors().subscribe(
      data => this._processSensorsData(data)
    );
  }

  _getSensors(): Observable < Sensor[] > {
    return this.http.get<ServerSensorsData>(this.sensorsUrl).pipe(
      // map(({ sensors }) => sensors) - same as pluck
      tap(data => {
        if (data.timestamp) {
          this.lastUpdate = new Date(data.timestamp * 1000);
        }
      }),
      pluck('sensors')
    );
  }

  _processSensorsData(data: Sensor[]): void {
    let changed = false;
    for (const s of data) {
      if (!this.lastChange || this.lastChange < s.last_change) {
        this.lastChange = s.last_change;
        changed = true;
      }
    }
    if (changed) {
      const groups: SensorGroups = {};
      for (const sensor of data) {
        if (!groups[sensor.group]) {
          groups[sensor.group] = [];
        }
        groups[sensor.group].push(sensor);
      }
      for (const group in groups) {
        if (groups.hasOwnProperty(group)) {
          groups[group].sort((a, b) => {
            return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
          });
        }
      }
      this.groupsSubject.next(groups);
      this.sensorsSubject.next(data);
    }
  }
}
