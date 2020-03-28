import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, interval, EMPTY, of, Subject, combineLatest, timer} from 'rxjs';
import {distinctUntilChanged, map, pluck, repeatWhen, skipWhile, startWith, switchMap, tap} from 'rxjs/operators';
import {Sensor, SensorGroups, SensorGraphPoint, SensorData, SensorIcon} from '../interfaces/sensor';
import { environment } from '../../environments/environment';
import {VisibilityApiService} from './visibility-api.service';
import {AuthService} from './auth.service';

interface ServerSensorsData {
  timestamp: number;
  sensors: SensorData[];
}

@Injectable({
  providedIn: 'root'
})

export class SensorsService {
  private sensorsUrl = environment.apiUrl + '/sensors/'; // URL to web api
  // https://rpi.xvv.be/sensors/states
  // https://rpi.xvv.be/sensors/52/ON|OFF
  // https://rpi.xvv.be/sensors/52 [post json]
  // https://rpi.xvv.be/sensors/52/graph
  // https://rpi.xvv.be/sensors/states/52
  private lastUpdate: Date;
  private sensorsSubject: BehaviorSubject<Sensor[]> = new BehaviorSubject([]);
  private groupsSubject: BehaviorSubject<SensorGroups> = new BehaviorSubject({});

  private lastChange: string;

  constructor(
    private http: HttpClient,
    private visibilityApi: VisibilityApiService,
    private authService: AuthService
  ) {

    // update sensors every interval (ms)
    const updateInterval = interval(3000).pipe(startWith(0));

    combineLatest([this.visibilityApi.monitor(), this.authService.monitor()]).pipe(
        map(data => data[0] && data[1]),
        switchMap(updateAllowed => updateAllowed ? updateInterval : EMPTY)
    ).subscribe(() => this.update());

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
    return this.http.get<SensorData>(this.sensorsUrl + 'states/' + id)
      .pipe(map(data => new Sensor(data)));
  }

  switch(id: number, state: boolean): void {
    const sensor = id;
    const newState = state ? 'ON' : 'OFF';
    this.http.get<any>(this.sensorsUrl + id + '/' + newState).subscribe(
      () => this.update()
    );
  }
  saveState(id: number, state: object): void {
    const sensor = id;
    this.http.post<any>(this.sensorsUrl + id, state).subscribe(
      () => this.update()
    );
  }

  graph(id: number, period: string): Observable<SensorGraphPoint[]> {
    // https://rpi.xvv.be/sensors/81/graph/day?
    return this.http.get<SensorGraphPoint[]>(this.sensorsUrl + id + '/graph/' + period);
  }

  getGroupIcon(name: string): string {
    return (new SensorIcon()).get(name);
  }

  _monitorSensors(): void {
    this._getSensors().subscribe(
      data => this._processSensorsData(data)
    );
  }

  _getSensors(): Observable<Sensor[]> {
    // TODO: Incremental updates
    // const url = this.sensorsUrl + (this.lastUpdate ? '?' + (this.lastUpdate.getTime() / 1000) : '');
    const url = this.sensorsUrl + 'states';
    return this.http.get<ServerSensorsData>(url).pipe(
      map(data => {
        if (data.timestamp) {
          this.lastUpdate = new Date(data.timestamp * 1000);
        }
        return data.sensors;
      }),
      map(sensors => sensors.map(sensor => new Sensor(sensor)))
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
