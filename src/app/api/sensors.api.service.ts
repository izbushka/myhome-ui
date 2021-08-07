import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
	IconsApiResponse,
	MappedIcons,
	Sensor,
	SensorFullState,
	SensorsApiResponse,
	SensorsResponse,
	SensorState,
} from '@entities/sensors.interfaces';
import {API_BASE_URL} from '@entities/sensors.constants';
import {map, take} from 'rxjs/operators';
import {SensorsApiMapper} from '@api/sensors.api.mapper';
import {Observable} from 'rxjs';
import {Period} from '@entities/common.interfaces';

@Injectable()
export class SensorsApiService {
	constructor(private http: HttpClient) {}

	public getSensors(icons: MappedIcons, lastUpdate?: number): Observable<SensorsResponse> {
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

	public getSensorDetails(id: Sensor['id']): Observable<Sensor> {
		const url = `${API_BASE_URL}/states/${id}`;

		return this.http.get<Sensor>(url).pipe(
			take(1)
		);
	}

	public getSensorChart(id: Sensor['id'], period: Period): Observable<Sensor> {
		const url = `${API_BASE_URL}/${id}/graph/${period}`;

		return this.http.get<Sensor>(url).pipe(
			take(1)
		);
	}

	public setSensorState(id: Sensor['id'], state: SensorState | SensorFullState): Observable<void> {
		if (typeof state === 'object') {
			const url = `${API_BASE_URL}/${id}`;
			return this.http.post<void>(url, state).pipe(
				take(1)
			);
		}

		const url = `${API_BASE_URL}/${id}/${(state as string).toUpperCase()}`;
		return this.http.get<void>(url).pipe(
			take(1)
		);
	}
}
