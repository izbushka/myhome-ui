import {ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';
import {MappedSensors, SensorGroup, SensorState} from '@entities/sensors.interfaces';
import {NgChanges} from '@entities/ng-changes.types';
import {SensorsHelper} from '@shared/helpers/sensors.helper';

@Component({
	selector: 'rpi-group-card',
	templateUrl: './group-card.component.html',
	styleUrls: ['./group-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCardComponent implements OnChanges {
	@Input() sensorGroup: SensorGroup;
	@Input() sensors: MappedSensors;

	stat = {num: 0, off: 0, on: 0, ok: 0};

	public ngOnChanges(changes: NgChanges<GroupCardComponent>): void {
		if (changes.sensors.currentValue) {
			this.getStatistic();
		}
	}

	private getStatistic(): void {
		let on = 0;
		let off = 0;
		let ok = 0;

		this.sensorGroup.members.forEach((sensor_id) => {
			const sensor = this.sensors[sensor_id];
			if (!sensor) {
				console.warn('Unknown sensor', sensor_id);
				return;
			}

			const state = SensorsHelper.getState(sensor);
			const defaultState = SensorsHelper.getState(sensor, true);

			if (state === SensorState.On) {
				on++;
			} else if (state === SensorState.Off) {
				off++;
			}

			if (sensor.normal_state && defaultState === state) {
				ok++;
			}
		});

		if (!this.stat.num || this.stat.on !== on || this.stat.off !== off || this.stat.ok !== ok) {
			this.stat = {num: this.sensorGroup.members.length, on, off, ok};
		}
	}
}
