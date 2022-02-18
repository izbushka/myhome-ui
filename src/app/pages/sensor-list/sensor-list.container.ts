import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PageParams} from '@entities/common.interfaces';
import {SENSORS_FAVORITES_GROUP, SENSORS_SEARCH_GROUP} from '@entities/sensors.constants';
import {MappedSensors, Sensor, SensorGroup, SensorGroups} from '@entities/sensors.interfaces';
import {LoadingStatus} from '@entities/store.interfaces';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {RouterSelectors} from '@store/router/selectors';
import {SensorsSelectors} from '@store/sensors/selectors';
import {combineLatest, Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import {SENSORS_SWITCHED_ON_GROUP} from '../../shared/entities/sensors.constants';

@Component({
	selector: 'rpi-sensor-list',
	template: `
		<rpi-sensor-list-component
			[sensorGroups]="sensorGroups$ | async"
			[sensors]="sensors$ | async"
			[loadingStatus]="loadingStatus$ | async"
		></rpi-sensor-list-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorListContainer {
	readonly sensorGroups$: Observable<SensorGroup[]>;
	readonly sensors$: Observable<MappedSensors>;
	readonly loadingStatus$: Observable<LoadingStatus>;

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
			this.sensors$,
		]).pipe(
			withLatestFrom(
				this.store.select(SensorsSelectors.localSearch),
				this.store.select(SensorsSelectors.favourites)
			),
			map(
				([[groups, groupId, switchedOn, filtered], search, favourites]: [
					[SensorGroup[], string, Sensor['id'][], MappedSensors],
					string,
					Sensor['id'][]
				]) => {
					if (groupId === SensorGroups.Favorites) {
						return [
							{
								...SENSORS_FAVORITES_GROUP,
								members: favourites,
							},
						];
					}
					if (groupId === SensorGroups.SwitchedOn) {
						return [
							{
								...SENSORS_SWITCHED_ON_GROUP,
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

					if (!groupId) {
						return groups;
					}

					const requestedGroup = groups.find((item) => item.name === groupId);

					if (!requestedGroup) {
						return groups;
					}

					return [requestedGroup];
				}
			)
		);
	}

	private getFilteredSensors(): Observable<MappedSensors> {
		return combineLatest([
			this.store.select(SensorsSelectors.sensors.map),
			this.store.select(SensorsSelectors.localSearch),
		]).pipe(
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
