import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, combineLatest, interval, Observable} from 'rxjs';
import {filter, map, mergeMap, skip, startWith, switchMapTo, take} from 'rxjs/operators';
import {Groups, Sensor, SensorData, SensorGraphPoint} from '../interfaces/sensor';
import {environment} from '../../../environments/environment';
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
  private sensors$: Map<number, BehaviorSubject<Sensor>> = new Map();
  private groupsData: Map<string, number[]> = new Map();
  private groupsData$: BehaviorSubject<Groups> = new BehaviorSubject({});

  private icons: IconsData[];

  private lastChange: string;

  constructor(
    private http: HttpClient,
    private visibilityApi: VisibilityApiService,
    private authService: AuthService
  ) {

    // update sensors every interval (ms)
    const updateInterval = interval(3000).pipe(startWith(0));

    // get sensors data
    combineLatest([this.visibilityApi.monitor(), this.authService.monitor()]).pipe(
      filter(data => data[0] && data[1]),
      mergeMap(() => updateInterval),
    ).subscribe(() => this.update());

    // get icons data when first sensors arrive
    this.groupsData$.pipe(
      skip(1), // skip initial BehaviorSubject value
      switchMapTo(this._getIconsFromServer()),
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

  groups(): BehaviorSubject<Groups> {
    return this.groupsData$;
  }

  getSensor(id: number): BehaviorSubject<Sensor> {
    return this.sensors$.get(id);
  }

  getAllSensors(): BehaviorSubject<Sensor>[] {
    return [...this.sensors$.values()];
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
    this.http.post<any>(this.sensorsUrl + id, state).subscribe(
      () => this.update()
    );
  }

  graph(id: number, period: string): Observable<SensorGraphPoint[]> {
    // https://my-server/sensors/81/graph/day?
    return this.http.get<SensorGraphPoint[]>(this.sensorsUrl + id + '/graph/' + period);
  }

  _getIconsFromServer(): Observable<IconsData[]> {
    return this.http.get<IconsData[]>(this.sensorsUrl + '/icons');
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
    // Incremental updates
    const url = this.sensorsUrl + 'states' + (this.lastUpdate ? '?' + (this.lastUpdate.getTime() / 1000) : '');
    // const url = this.sensorsUrl + 'states'; // non-incremental updates
    return this.http.get<ServerSensorsData>(url).pipe(
      filter(data => data.sensors.length > 0),
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
    let created = false;
    for (const sensor of data) {
      created = this._updateSensor(sensor) || created;
      if (!this.lastChange || this.lastChange < sensor.last_change) {
        this.lastChange = sensor.last_change;
      }
    }
    if (created) {
      const groups = Array.from(this.groupsData.entries()).reduce(
        (main, [key, value]) => ({...main, [key]: value}), {}
      );

      // sort by sensor-card name
      for (const group in groups) {
        groups[group] = groups[group].sort((n1, n2) => {
          const s1name = this.sensors$.get(n1).getValue().name;
          const s2name = this.sensors$.get(n2).getValue().name;
          return s1name > s2name ? 1 : -1;
        });
      }
      this.groupsData$.next(groups);
    }
  }

  _updateSensor(sensor: Sensor): boolean {
    let created = false;
    if (this.sensors$.has(sensor.id)) {
      const oldState = this.sensors$.get(sensor.id).getValue();
      if (oldState.last_change < sensor.last_change) {
        // updating sensor-card
        // console.log('updating sensor-card ', sensor-card.id);
        this.sensors$.get(sensor.id).next(sensor);
      }
    } else {
      created = true;
      this.sensors$.set(sensor.id, new BehaviorSubject(sensor));
      if (this.groupsData.has(sensor.group)) {
        this.groupsData.set(sensor.group, [...this.groupsData.get(sensor.group), sensor.id]);
      } else {
        this.groupsData.set(sensor.group, [sensor.id]);
      }
    }
    return created;
  }
}
