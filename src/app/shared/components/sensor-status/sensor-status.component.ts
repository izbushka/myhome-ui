import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Sensor, SensorFullState, SensorGroups, SensorState} from '@entities/sensors.interfaces';
import {MatDialog} from '@angular/material/dialog';
import {AcControlContainer} from '@shared/components/ac-control/ac-control.container';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
	selector: 'rpi-sensor-status-component',
	templateUrl: './sensor-status.component.html',
	styleUrls: ['./sensor-status.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorStatusComponent {
	@Input() sensor: Sensor;

	@Output() setState = new EventEmitter<SensorState | SensorFullState>();

	readonly states = SensorState;
	state: SensorState;
	groups = SensorGroups;

	constructor(public dialog: MatDialog) {}

	public toggle(state: MatSlideToggleChange): void {
		const newState = state.checked ? SensorState.On : SensorState.Off;
		if (!this.sensor.jsonState) {
			this.setState.emit(newState);
			return;
		}

		this.setState.emit({
			...this.sensor.jsonState,
			state: newState,
		});
	}

	public openAcControl(): void {
		this.dialog.open(AcControlContainer, {
			width: '500px',
			height: 'fit-content',
			data: this.sensor,
		});
	}
}
