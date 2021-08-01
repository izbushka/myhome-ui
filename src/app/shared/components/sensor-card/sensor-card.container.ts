import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Sensor} from '@entities/sensors.interfaces';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {RouterActions} from '@store/router/actions';
import {Pages} from '@entities/common.interfaces';

@Component({
	selector: 'rpi-sensor-card',
	template: '<rpi-sensor-card-component [sensor]="sensor" (toDetails)="goToDetails()"></rpi-sensor-card-component>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorCardContainer {
	@Input() sensor: Sensor;
	@Output() toDetails = new EventEmitter<number>();

	constructor(private store: Store<AppState>) {}

	public goToDetails(): void {
		this.store.dispatch(RouterActions.go({url: [Pages.SensorDetails, this.sensor.sensor_id]}));
	}
}
