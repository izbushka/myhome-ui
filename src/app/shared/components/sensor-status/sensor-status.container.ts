import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Sensor, SensorFullState, SensorState} from '@entities/sensors.interfaces';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsActions} from '@store/sensors/actions';

@Component({
	selector: 'rpi-sensor-status',
	template: `
		<rpi-sensor-status-component [sensor]="sensor" (setState)="setState($event)"></rpi-sensor-status-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorStatusContainer {
	@Input() sensor: Sensor;

	constructor(private store: Store<AppState>) {}

	public setState(state: SensorState | SensorFullState): void {
		this.store.dispatch(SensorsActions.switchSensor.requested({sensorId: this.sensor.sensor_id, state}));
	}
}
