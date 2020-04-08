import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AdministrationModule} from './administration.module';
import {Observable} from 'rxjs';
import {DbSensors} from './db-sensors';

@Injectable()
export class AdministrationService {
  private baseUri = environment.apiUrl + '/configuration/'; // URL to web api
  constructor(private http: HttpClient) { }

  getSensors(): Observable<DbSensors[]> {
    return this.http.get<DbSensors[]>(this.baseUri + '/get/sensors');
  }

  getTable(table: string): Observable<any> {
    return this.http.get<any>(this.baseUri + '/get/' + table);
  }
}
