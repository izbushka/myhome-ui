import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Sensor, SensorFullState, SensorState} from '@entities/sensors.interfaces';
import {NgChanges} from '@entities/ng-changes.types';
import {SensorsHelper} from '@shared/helpers/sensors.helper';
import {MatDialog} from '@angular/material/dialog';
import {AcControlContainer} from '@shared/components/ac-control/ac-control.container';

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

	public toggle(): void {
		const newState = this.state === SensorState.On ? SensorState.Off : SensorState.On;
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
		this.state = SensorsHelper.getState(this.sensor);
		this.configurable = SensorsHelper.isJSON(this.sensor.state);
	}
}
