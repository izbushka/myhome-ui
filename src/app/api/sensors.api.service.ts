import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SensorsApiResponse} from '@entities/sensors.interfaces';
import {API_BASE_URL} from '@entities/sensors.constants';
import {map, take} from 'rxjs/operators';
import {SensorsApiMapper} from '@api/sensors.api.mapper';
import {Observable} from 'rxjs';

@Injectable()
export class SensorsApiService {
	constructor(private http: HttpClient) {}

	public getSensors(lastUpdate?: number): Observable<SensorsApiResponse> {
		const url = `${API_BASE_URL}/states${lastUpdate ? `?${lastUpdate}` : ''}`;

		return this.http.get<SensorsApiResponse>(url).pipe(
			take(1),
			map(SensorsApiMapper.mapSensors)
		);
	}
}
