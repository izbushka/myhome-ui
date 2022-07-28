import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppState} from '@store/rootReducer';
import {Store} from '@ngrx/store';
import {AcState, Sensor} from '@entities/sensors.interfaces';
import {SensorsActions} from '@store/sensors/actions';

@Component({
	selector: 'rpi-ac-control',
	template: `
		<rpi-ac-control-component
			[sensor]="sensor"
			(setState)="setState($event)"
			(closeModal)="closeModal()"
		></rpi-ac-control-component>
	`,
	styleUrls: ['./ac-control.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcControlContainer {
	constructor(
		private acControlDialogRef: MatDialogRef<AcControlContainer>,
		private store: Store<AppState>,
		@Inject(MAT_DIALOG_DATA) public sensor: Sensor
	) {}

	public closeModal(): void {
		this.acControlDialogRef.close();
	}

	public setState(state: AcState): void {
		this.store.dispatch(SensorsActions.switchSensor.requested({sensorId: this.sensor.id, state}));
	}
}
