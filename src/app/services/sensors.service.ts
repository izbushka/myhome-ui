import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of , Observable, BehaviorSubject, interval } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';​

import { Sensor,SensorGroups } from '@myInterfaces/sensor';

interface ServerSensorsData {
    timestamp: number,
    sensors: Sensor[]
}

@Injectable({
  providedIn: 'root'
})

export class SensorsService {
  private sensorsUrl = 'http://11.230.0.2/sensors/states?'; // URL to web api  
  private lastUpdate: Date;
  private sensorsSubject: BehaviorSubject<Sensor[]> = new BehaviorSubject([]);
  private groupsSubject: BehaviorSubject<SensorGroups> = new BehaviorSubject({});


  constructor(
    private http: HttpClient
  ) {
    this.update();
    interval(3000).subscribe(() => this.update());
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
  _monitorSensors(): void {
    this._getSensors().subscribe(
      data => this._processSensorsData(data)
    )
  }

  _getSensors(): Observable < Sensor[] > {
    return this.http.get<ServerSensorsData>(this.sensorsUrl).pipe(
      // map(({ sensors }) => sensors) - same as pluck
      tap(data => { if (data.timestamp) this.lastUpdate = new Date(data.timestamp * 1000) }),
      pluck('sensors')
    );
  }

  _processSensorsData(data: Sensor[]): void {
    let groups = {};
    
    for (let sensor of data) {
      if (!groups[sensor.group]) groups[sensor.group] = [];
      groups[sensor.group].push(sensor);
    }
    for (let group in groups) {
      groups[group].sort(function(a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
    }
    this.groupsSubject.next(groups);
    console.log(groups);
    this.sensorsSubject.next(data);
  }
}
