import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {catchError, delay, filter, map, mapTo, repeat, retry, retryWhen, switchMap, switchMapTo, take, tap} from 'rxjs/operators';
import {Group, Sensor, SensorData, SensorGraphPoint} from '../interfaces/sensor';
import {environment} from '../../../environments/environment';
import {VisibilityApiService} from './visibility-api.service';
import {AuthService} from './auth.service';
import {AppStorageService} from './app-storage.service';

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
  private readonly refreshInterval = 3000;

  private sensorsUrl = environment.apiUrl + '/sensors/'; // URL to web api
  // https://my-server/sensors/states
  // https://my-server/sensors/52/ON|OFF
  // https://my-server/sensors/52 [post json]
  // https://my-server/sensors/52/graph
  // https://my-server/sensors/states/52
  private fullRefreshTime = 300; // Get full sensors list ones in this seconds
  private lastUpdate: Date;
  private lastFullUpdate: Date;
  private sensors$: Map<number, BehaviorSubject<Sensor>> = new Map();
  private groupsData: Map<string, number[]> = new Map();
  private groupsData$: BehaviorSubject<Group[]> = new BehaviorSubject([]);

  private icons: IconsData[];

  private lastChange: number;

  constructor(
    private http: HttpClient,
    private visibilityApi: VisibilityApiService,
    private authService: AuthService,
    private storage: AppStorageService
  ) {

    // icons cache
    const iconsCacheTTL = 36000;
    const iconsCacheKey = 'icons';
    this.icons = this.storage.get('local', iconsCacheKey);

    // get icons
    const getIcons$: Observable<boolean> = this.icons?.length > 0 // get icons if empty
      ? of(true)
      : this._getIconsFromServer().pipe(
        map(icons => {
            this.icons = icons;
            this.storage.set('local', iconsCacheKey, this.icons, iconsCacheTTL);
            return true;
          }
        ),
        retryWhen(error => error.pipe(
          delay(this.refreshInterval)
        ))
      );

    // short polling sensors after icons
    getIcons$.pipe(
      switchMapTo(
        combineLatest([
          this.visibilityApi.monitor(),                 // visible
          this.authService.monitor(),                   // authorized
        ]).pipe(
          tap(() => { this.lastFullUpdate = null;}), // get full update
          switchMap(([visible, authorized]) => !visible || !authorized
            ? of([])
            : this.updateSensors().pipe(
              delay(this.refreshInterval),
              repeat(),
              retryWhen(error => error.pipe(
                delay(this.refreshInterval)
              ))
            ))
        )
      )
    ).subscribe(() => {});
  }

  update(): void {
    this.lastFullUpdate = null; // get full update
    this.updateSensors().subscribe(() => {});
  }
  updateSensors(): Observable<boolean>{
    return this._getSensors().pipe(
      tap((data) => {
        this._processSensorsData(data);
      }),
      mapTo(true),
      catchError((e) => of(false))
    );
  }

  groups(): Observable<Group[]> {
    return this.groupsData$.asObservable();
  }

  getSensor(id: number): Observable<Sensor> {
    return this.sensors$.get(id).asObservable();
  }

  getAllSensors(snapshot?: boolean): Observable<Sensor>[] | Sensor[] {
    if (snapshot) {
      return [...this.sensors$.values()].map(i => i.getValue());
    }
    return [...this.sensors$.values()].map(i => i.asObservable());
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
    return this.http.get<IconsData[]>(this.sensorsUrl + 'icons');
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
    return of(true).pipe(
      switchMap(() => {
        // full update from time to time
        const lastFullUpdate = (new Date().getTime() - this.lastFullUpdate?.getTime()) / 1000;
        if (!this.lastFullUpdate || lastFullUpdate > this.fullRefreshTime) {
          this.lastUpdate = null;
          this.lastFullUpdate = new Date();
        }
        // Incremental updates
        const url = this.sensorsUrl + 'states' + (this.lastUpdate ? '?' + (this.lastUpdate.getTime() / 1000) : '');
        return this.http.get<ServerSensorsData>(url).pipe(
          take(1),
          filter(data => data.sensors.length > 0),
          map(data => {
            if (data.timestamp) {
              this.lastUpdate = new Date(data.timestamp * 1000);
            }
            return data.sensors.map(sensor => {
              const s = new Sensor(sensor);
              s.setIcon(this.getSensorIcon(s));
              return s;
            });
          })
        );
      }),
      catchError((e) => {
        console.log('Error getting sensors', e);
        return of (null);
      })
    );
  }

  _processSensorsData(data: Sensor[]): void {
    let created = false;
    for (const sensor of data) {
      created = this._updateSensor(sensor) || created;
      if (!this.lastChange || this.lastChange < sensor.timestamp) {
        this.lastChange = sensor.timestamp;
      }
    }
    if (created) {
      // const groups = Array.from(this.groupsData.entries()).reduce(
      //   (main, [key, value]) => ({...main, [key]: value}), {}
      // );
      const groups = [];

      // sort by sensor-card name
      for (const group of this.groupsData.keys()) {
        const members = this.groupsData.get(group).sort((n1, n2) => {
          const s1name = this.sensors$.get(n1).getValue().name;
          const s2name = this.sensors$.get(n2).getValue().name;
          return s1name > s2name ? 1 : -1;
        });

        groups.push({
          name: group,
          members,
          icon: this.getGroupIcon(group)
        });

        groups.sort((a, b) => a.name.localeCompare(b.name));
      }
      this.groupsData$.next(groups);
    }
  }

  _updateSensor(sensor: Sensor): boolean {
    let created = false;
    if (this.sensors$.has(sensor.id)) { // sensor exists - updating
      const oldState = this.sensors$.get(sensor.id).getValue();
      if (oldState.timestamp < sensor.timestamp) {
        // console.log('updating sensor', sensor.id);
        this.sensors$.get(sensor.id).next(sensor);
      }
    } else { // new sensor
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
