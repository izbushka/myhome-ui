import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsSelectors} from '@store/sensors/selectors';
import {Observable} from 'rxjs';
import {MappedSensors, SensorGroup} from '@entities/sensors.interfaces';
import {LoadingStatus} from '@entities/store.interfaces';

@Component({
	selector: 'rpi-dashboard',
	template: `
		<rpi-dashboard-component
			[sensorGroups]="sensorGroups$ | async"
			[sensors]="sensors$ | async"
			[loadingStatus]="sensorsLoadingStatus$ | async"
		></rpi-dashboard-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardContainer {
	readonly sensorGroups$: Observable<SensorGroup[]>;
	readonly sensors$: Observable<MappedSensors>;
	readonly sensorsLoadingStatus$: Observable<LoadingStatus>;

	constructor(private store: Store<AppState>) {
		this.sensorGroups$ = this.store.select(SensorsSelectors.sensorGroups.list);
		this.sensors$ = this.store.select(SensorsSelectors.sensors.map);
		this.sensorsLoadingStatus$ = this.store.select(SensorsSelectors.sensors.loadingStatus);
	}
}
