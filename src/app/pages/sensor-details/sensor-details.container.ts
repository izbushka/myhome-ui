import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsActions} from '@store/sensors/actions';
import {Observable} from 'rxjs';
import {Sensor, SensorLog} from '@entities/sensors.interfaces';
import {SensorsSelectors} from '@store/sensors/selectors';
import {map, withLatestFrom} from 'rxjs/operators';
import {RouterSelectors} from '@store/router/selectors';
import {PageParams} from '@entities/common.interfaces';
import {LoadingStatus} from '@entities/store.interfaces';

@Component({
	selector: 'rpi-sensor-details',
	template: `
		<rpi-sensor-details-component
			[sensor]="sensor$ | async"
			[logs]="sensorLogs$ | async"
			[loadingStatus]="loadingStatus$ | async"
		></rpi-sensor-details-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorDetailsContainer implements OnInit {
	sensor$: Observable<Sensor>;
	sensorLogs$: Observable<SensorLog[]>;
	loadingStatus$: Observable<LoadingStatus>;

	constructor(private store: Store<AppState>) {
		this.sensor$ = this.store.select(SensorsSelectors.sensors.map).pipe(
			withLatestFrom(this.store.select(RouterSelectors.selectRouteParam(PageParams.SensorId))),
			map(([sensors, sensorId]) => sensors[+sensorId])
		);

		this.sensorLogs$ = this.store.select(SensorsSelectors.sensorDetails.logs);
		this.loadingStatus$ = this.store.select(SensorsSelectors.sensorDetails.loadingStatus);
	}

	ngOnInit(): void {
		this.store.dispatch(SensorsActions.getSensorDetails.requested());
	}
}
