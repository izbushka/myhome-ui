import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsSelectors} from '@store/sensors/selectors';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {MappedSensors, Sensor, SensorGroup, SensorGroups} from '@entities/sensors.interfaces';
import {map} from 'rxjs/operators';
import {RouterSelectors} from '@store/router/selectors';
import {PageParams} from '@entities/common.interfaces';
import {LoadingStatus} from '@entities/store.interfaces';
import {SENSORS_FAVORITES_GROUP, SENSORS_SEARCH_GROUP} from '@entities/sensors.constants';

@Component({
	selector: 'rpi-sensor-list',
	template: `
		<rpi-sensor-list-component
			[sensorGroups]="sensorGroups$ | async"
			[sensors]="sensors$ | async"
			[loadingStatus]="loadingStatus$ | async"
			(doSearch)="search$.next($event)"
		></rpi-sensor-list-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorListContainer {
	readonly sensorGroups$: Observable<SensorGroup[]>;
	readonly sensors$: Observable<MappedSensors>;
	readonly loadingStatus$: Observable<LoadingStatus>;
	readonly search$ = new BehaviorSubject<string>('');

	constructor(private store: Store<AppState>) {
		this.sensors$ = this.getFilteredSensors();
		this.sensorGroups$ = this.getSensorGroups();
		this.loadingStatus$ = this.store.select(SensorsSelectors.sensors.loadingStatus);
	}

	private getSensorGroups(): Observable<SensorGroup[]> {
		return combineLatest([
			this.store.select(SensorsSelectors.sensorGroups.list),
			this.store.select(RouterSelectors.selectRouteParam(PageParams.GroupId)),
			this.store.select(SensorsSelectors.sensors.switchedOn),
			this.search$,
			this.sensors$,
		]).pipe(
			map(
				([groups, groupId, switchedOn, search, filtered]: [
					SensorGroup[],
					string,
					Sensor['id'][],
					string,
					MappedSensors
				]) => {
					if (groupId === SensorGroups.Favorites) {
						return [
							{
								...SENSORS_FAVORITES_GROUP,
								members: switchedOn,
							},
						];
					}
					if (search.length) {
						return [
							{
								...SENSORS_SEARCH_GROUP,
								members: Object.keys(filtered) as unknown as Sensor['id'][],
							},
						];
					}
					return groupId ? [groups.find((item) => item.name === groupId)] : groups;
				}
			)
		);
	}

	private getFilteredSensors(): Observable<MappedSensors> {
		return combineLatest([this.store.select(SensorsSelectors.sensors.map), this.search$]).pipe(
			map(([sensors, search]) => {
				if (!search) {
					return sensors;
				}
				const filtered: MappedSensors = {};
				Object.values(sensors).forEach((sensor) => {
					if (sensor.name.toLowerCase().includes(search)) {
						filtered[sensor.id] = sensor;
					}
				});
				return filtered;
			})
		);
	}
}
