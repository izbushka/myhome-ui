import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Sensor, SensorFullState, SensorState} from '@entities/sensors.interfaces';
import {NgChanges} from '@entities/ng-changes.types';
import {SensorsHelper} from '@shared/helpers/sensors.helper';
import {MatDialog} from '@angular/material/dialog';
import {AcControlContainer} from '@shared/components/ac-control/ac-control.container';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
	selector: 'rpi-sensor-status-component',
	templateUrl: './sensor-status.component.html',
	styleUrls: ['./sensor-status.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorStatusComponent implements OnChanges {
	@Input() sensor: Sensor;

	@Output() setState = new EventEmitter<SensorState | SensorFullState>();

	readonly states = SensorState;
	state: SensorState;
	configurable: boolean;

	constructor(public dialog: MatDialog) {}

	public ngOnChanges(changes: NgChanges<SensorStatusComponent>): void {
		if (changes.sensor.currentValue) {
			this.init();
		}
	}

	toggle(state: MatSlideToggleChange): void {
		const newState = state.checked ? SensorState.On : SensorState.Off;
		if (!this.configurable) {
			this.setState.emit(newState);
			return;
		}

		const jsonState = SensorsHelper.getFullState(this.sensor);
		jsonState.state = newState;
		this.setState.emit(jsonState);
	}

	public openAcControl(): void {
		this.dialog.open(AcControlContainer, {
			width: '500px',
			height: 'fit-content',
			data: this.sensor,
		});
	}

	private init(): void {
		const state = SensorsHelper.getState(this.sensor);

		if (state === SensorState.On || state === SensorState.Off) {
			this.state = state;
		}

		this.configurable = SensorsHelper.isJSON(this.sensor.state);
	}
}
