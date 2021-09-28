import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsSelectors} from '@store/sensors/selectors';
import {combineLatest, Observable} from 'rxjs';
import {MappedSensors, Sensor, SensorGroup, SensorGroups} from '@entities/sensors.interfaces';
import {map} from 'rxjs/operators';
import {RouterSelectors} from '@store/router/selectors';
import {PageParams} from '@entities/common.interfaces';
import {LoadingStatus} from '@entities/store.interfaces';
import {SENSORS_FAVORITES_GROUP} from '@entities/sensors.constants';

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
		this.sensorGroups$ = this.getSensorGroups();
		this.sensors$ = this.store.select(SensorsSelectors.sensors.map);
		this.loadingStatus$ = this.store.select(SensorsSelectors.sensors.loadingStatus);
	}

	private getSensorGroups(): Observable<SensorGroup[]> {
		return combineLatest([
			this.store.select(SensorsSelectors.sensorGroups.list),
			this.store.select(RouterSelectors.selectRouteParam(PageParams.GroupId)),
			this.store.select(SensorsSelectors.sensors.switchedOn),
		]).pipe(
			map(([groups, groupId, switchedOn]: [SensorGroup[], string, Sensor['id'][]]) => {
				if (groupId === SensorGroups.Favorites) {
					return [
						{
							...SENSORS_FAVORITES_GROUP,
							members: switchedOn,
						},
					];
				}
				return groupId ? [groups.find((item) => item.name === groupId)] : groups;
			})
		);
	}
}