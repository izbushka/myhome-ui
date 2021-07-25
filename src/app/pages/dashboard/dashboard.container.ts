import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsActions} from '@store/sensors/actions';
import {SensorsSelectors} from '@store/sensors/selectors';
import {Observable} from 'rxjs';
import {MappedSensors, SensorGroup} from '@entities/sensors.interfaces';

@Component({
	selector: 'rpi-dashboard',
	template: `
		<rpi-dashboard-component
			[sensorGroups]="sensorGroups$ | async"
			[sensors]="sensors$ | async"
		></rpi-dashboard-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardContainer implements OnInit {
	sensorGroups$: Observable<SensorGroup[]>;
	sensors$: Observable<MappedSensors>;

	public constructor(private store: Store<AppState>) {
		this.sensorGroups$ = this.store.select(SensorsSelectors.sensorGroups.list);
		this.sensors$ = this.store.select(SensorsSelectors.sensors.map);
	}

	public ngOnInit(): void {
		this.store.dispatch(SensorsActions.getSensors.requested());
	}
}
