import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IconsApiResponse, MappedIcons, Sensor, SensorsApiResponse, SensorState} from '@entities/sensors.interfaces';
import {API_BASE_URL} from '@entities/sensors.constants';
import {map, take} from 'rxjs/operators';
import {SensorsApiMapper} from '@api/sensors.api.mapper';
import {Observable} from 'rxjs';

@Injectable()
export class SensorsApiService {
	constructor(private http: HttpClient) {}

	public getSensors(icons: MappedIcons, lastUpdate?: number): Observable<SensorsApiResponse> {
		const url = `${API_BASE_URL}/states${lastUpdate ? `?${lastUpdate}` : ''}`;

		return this.http.get<SensorsApiResponse>(url).pipe(
			take(1),
			map((res) => SensorsApiMapper.mapSensors(res, icons))
		);
	}

	public getIcons(): Observable<IconsApiResponse> {
		const url = `${API_BASE_URL}/icons`;

		return this.http.get<IconsApiResponse>(url).pipe(
			take(1)
		);
	}

	public switchSensor(id: Sensor['sensor_id'], state: SensorState): Observable<void> {
		const url = `${API_BASE_URL}/${id}/${state.toUpperCase()}`;

		return this.http.get<void>(url).pipe(
			take(1)
		);
	}
}
