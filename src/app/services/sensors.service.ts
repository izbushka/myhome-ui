import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, combineLatest, interval, Observable} from 'rxjs';
import {delay, filter, map, mergeMap, startWith, take, tap} from 'rxjs/operators';
import {Groups, Sensor, SensorData, SensorGraphPoint, SensorGroups, Sensors} from '../interfaces/sensor';
import {environment} from '../../environments/environment';
import {VisibilityApiService} from './visibility-api.service';
import {AuthService} from './auth.service';

interface ServerSensorsData {
  timestamp: number;
  sensors: SensorData[];
}

interface IconsData {
  type: string;
  key: string | number;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  private sensorsUrl = environment.apiUrl + '/sensors/'; // URL to web api
  // https://my-server/sensors/states
  // https://my-server/sensors/52/ON|OFF
  // https://my-server/sensors/52 [post json]
  // https://my-server/sensors/52/graph
  // https://my-server/sensors/states/52
  private lastUpdate: Date;
  private sensorsData: Sensors = Object.create(null);
  private groupsData: Groups = Object.create(null);

  private sensorsSubject: BehaviorSubject<Sensor[]> = new BehaviorSubject([]);
  private groupsSubject: BehaviorSubject<SensorGroups> = new BehaviorSubject({});
  private icons: IconsData[];

  private lastChange: string;

  constructor(
    private http: HttpClient,
    private visibilityApi: VisibilityApiService,
    private authService: AuthService
  ) {

    // update sensors every interval (ms)
    const updateInterval = interval(3000).pipe(startWith(0));

    combineLatest([this.visibilityApi.monitor(), this.authService.monitor()]).pipe(
        filter(data => data[0] && data[1]),
        mergeMap(() => updateInterval),
    ).subscribe(() => this.update());

    this.sensorsSubject.pipe(
      filter(data => data.length > 0),
      mergeMap(() => this._getIconsFromServer()),
      take(1)
    ).subscribe(
      icons => this.icons = icons
    );
  }

  update(): void {
    this._getSensors().subscribe(
      data => this._processSensorsData(data)
    );
  }

  sensors(): BehaviorSubject<Sensor[]> {
    return this.sensorsSubject;
  }

  groups(): BehaviorSubject<SensorGroups> {
    return this.groupsSubject;
  }

  getGroups(): Groups {
    return this.groupsData;
  }

  getSensor(id: number): Sensor {
    return this.sensorsData[id.toString()];
  }

  details(id: number): Observable<Sensor> {
    return this.http.get<SensorData>(this.sensorsUrl + 'states/' + id)
      .pipe(map(data => new Sensor(data)));
  }

  switch(id: number, state: boolean): void {
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
    // https://my-server/sensors/81/graph/day?
    return this.http.get<SensorGraphPoint[]>(this.sensorsUrl + id + '/graph/' + period);
  }

  _getIconsFromServer(): Observable<IconsData[]> {
    return this.http.get<IconsData[]>(this.sensorsUrl + '/icons')
      // .pipe(
      //   delay(2000),
      //   tap(_ => console.debug(this.groupsData))
      // )
      ;
  }

  getIcon(type: string, key: string, fallbackToDefault?: boolean): string {
    fallbackToDefault = fallbackToDefault === undefined || fallbackToDefault;

    let res = ''; // default
    if (this.icons) {
      let icon = this.icons.filter(x => x.type === type && x.key === key);
      if (icon[0]) {
        res = icon[0].icon;
      } else if (fallbackToDefault) {
        icon = this.icons.filter(x => x.type === 'default' && x.key === 'default');
        res = icon[0].icon;
      }
    } else if (fallbackToDefault) { // loading icon
      res = 'more_horiz';
    }
    return res;
  }

  getSensorIcon(sensor: Sensor): string {
    let icon = this.getIcon('sensor', sensor.id.toString(), false);
    if (!icon) {
      icon = this.getIcon('group', sensor.group);
    }
    return icon;
  }

  getGroupIcon(group: string): string {
    return this.getIcon('group', group);
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
    // const groups = [];
    for (const sensor of data) {
      const sensorId = sensor.id.toString();
      // groups.push(sensor.group);
      if (!this.sensorsData
        || !this.sensorsData[sensorId]
        || this.sensorsData[sensorId].last_change < sensor.last_change) {
        this.sensorsData[sensor.id.toString()] = sensor;
        // this.groupsData[sensor.id.toString()].push(sensorId);
      }
      if (!this.lastChange || this.lastChange < sensor.last_change) {
        this.lastChange = sensor.last_change;
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
      const sensorGroups = {};
      for (const group in groups) {
        if (groups.hasOwnProperty(group)) {
          groups[group].sort((a, b) => {
            return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
          });
          sensorGroups[group] = groups[group].map(sensor => sensor.id);
        }
      }
      this.groupsData = sensorGroups;

      this.groupsSubject.next(groups);
      this.sensorsSubject.next(data);
    }
  }
}
