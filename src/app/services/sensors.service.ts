import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, interval} from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import {Sensor, SensorGroups, SensorGraphPoint, SensorData} from '../interfaces/sensor';
import { environment } from '../../environments/environment';

interface ServerSensorsData {
  timestamp: number;
  sensors: SensorData[];
}

@Injectable({
  providedIn: 'root'
})

export class SensorsService {
  private sensorsUrl = environment.apiUrl + '/sensors/states'; // URL to web api
  // private sensorsUrl = 'http://11.230.0.2/sensors/states'; // URL to web api
  private lastUpdate: Date;
  private sensorsSubject: BehaviorSubject<Sensor[]> = new BehaviorSubject([]);
  private groupsSubject: BehaviorSubject<SensorGroups> = new BehaviorSubject({});

  private lastChange: string;

  constructor(
    private http: HttpClient
  ) {
    this.update();
    interval(3000).subscribe(() => this.update());
  }

  update(): void {
    this._monitorSensors();
  }

  sensors(): BehaviorSubject<Sensor[]> {
    return this.sensorsSubject;
  }

  groups(): BehaviorSubject<SensorGroups> {
    return this.groupsSubject;
  }

  details(id: number): Observable<Sensor> {
    return this.http.get<SensorData>(this.sensorsUrl + '/' + id)
      .pipe(map(data => new Sensor(data)));
  }

  switch(id: number, state: boolean): void {
    const sensor = id;
    const newState = state ? 'ON' : 'OFF';
    this.http.get<any>(this.sensorsUrl + '/../../zwave/' + id + '/' + newState).subscribe(
      () => this.update()
    );
  }

  graph(id: number, period: string): Observable<SensorGraphPoint[]> {
    // https://rpi.xvv.be/sensors/81/graph/day?
    return this.http.get<SensorGraphPoint[]>(this.sensorsUrl + '/../' + id + '/graph/' + period);
  }

  getGroupIcon(name: string): string {
    const icons = {
      lock: 'lock',
      'light-switch': 'lightbulb_outline',
      'power-switch': 'power',
      'light-btn': 'wb_incandescent',
      'air-conditioner': 'ac_unit',
      'air-purifier': 'toys',
      alarm: 'security',
      motion: 'remove_red_eye',
      sensors: 'filter_tilt_shift',

      default: 'policy'

    };
    return (icons[name]) ? icons[name] : icons.default;
  }

  _monitorSensors(): void {
    this._getSensors().subscribe(
      data => this._processSensorsData(data)
    );
  }

  _getSensors(): Observable<Sensor[]> {
    // TODO: Incremental updates
    // const url = this.sensorsUrl + (this.lastUpdate ? '?' + (this.lastUpdate.getTime() / 1000) : '');
    const url = this.sensorsUrl;
    return this.http.get<ServerSensorsData>(url).pipe(
      tap(data => {
        if (data.timestamp) {
          this.lastUpdate = new Date(data.timestamp * 1000);
        }
      }),
      pluck('sensors'),
      map(data => data.map(sensor => new Sensor(sensor)))
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
