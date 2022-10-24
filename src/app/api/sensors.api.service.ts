import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
	IconsApiResponse,
	MappedIcons,
	ScheduledState,
	SchedulesApiItem,
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

/* eslint-disable @typescript-eslint/naming-convention */
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

		return this.http.get<IconsApiResponse>(url).pipe(take(1));
	}

	public addSchedule(data: ScheduledState): Observable<ScheduledState[]> {
		const url = `${API_BASE_URL}/schedules`;
		const state = typeof data.state === 'string' ? data.state : JSON.stringify(data.state);
		const apiData = {
			sensor_id: data.id,
			timestamp: data.timestamp,
			state,
			repeat: data.repeat,
		};

		return this.http.post<SchedulesApiItem[]>(url, apiData).pipe(take(1), map(SensorsApiMapper.mapSchedules));
	}

	public deleteSchedule(scheduleId: ScheduledState['scheduleId']): Observable<ScheduledState[]> {
		const url = `${API_BASE_URL}/schedules`;

		return this.http
			.delete<SchedulesApiItem[]>(url, {body: {schedule_id: scheduleId}})
			.pipe(take(1), map(SensorsApiMapper.mapSchedules));
	}

	public getSchedules(): Observable<ScheduledState[]> {
		const url = `${API_BASE_URL}/schedules`;

		return this.http.get<SchedulesApiItem[]>(url).pipe(take(1), map(SensorsApiMapper.mapSchedules));
	}

	public getFavourites(): Observable<Sensor['id'][]> {
		const url = `${API_BASE_URL}/favourites`;

		return this.http.get<Sensor['id'][]>(url).pipe(take(1));
	}

	public toggleFavourites(id: Sensor['id']): Observable<Sensor['id'][]> {
		const url = `${API_BASE_URL}/favourites/toggle/${id}`;

		return this.http.get<Sensor['id'][]>(url).pipe(take(1));
	}

	public getSensorDetails(id: Sensor['id']): Observable<Sensor> {
		const url = `${API_BASE_URL}/states/${id}`;

		return this.http.get<Sensor>(url).pipe(take(1));
	}

	public getSensorChart(id: Sensor['id'], period: Period): Observable<Sensor> {
		const url = `${API_BASE_URL}/${id}/graph/${period}`;

		return this.http.get<Sensor>(url).pipe(take(1));
	}

	public setSensorState(id: Sensor['id'], state: SensorState | SensorFullState): Observable<void> {
		if (typeof state === 'object') {
			const url = `${API_BASE_URL}/${id}`;
			return this.http.post<void>(url, state).pipe(take(1));
		}

		const url = `${API_BASE_URL}/${id}/${(state as string).toUpperCase()}`;
		return this.http.get<void>(url).pipe(take(1));
	}
}
