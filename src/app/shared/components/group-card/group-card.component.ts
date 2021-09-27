import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MappedSensors, SensorGroup, SensorState, SensorStatus} from '@entities/sensors.interfaces';
import {NgChanges} from '@entities/ng-changes.types';

@Component({
	selector: 'rpi-group-card-component',
	templateUrl: './group-card.component.html',
	styleUrls: ['./group-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCardComponent implements OnChanges {
	@Input() sensorGroup: SensorGroup;
	@Input() sensors: MappedSensors;

	@Output() goToGroup = new EventEmitter<SensorGroup['name']>();

	stat = {num: 0, off: 0, on: 0, ok: 0};

	public ngOnChanges(changes: NgChanges<GroupCardComponent>): void {
		if (changes.sensors?.currentValue) {
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

			if (sensor.sensorState === SensorState.On) {
				on++;
			} else if (sensor.sensorState === SensorState.Off) {
				off++;
			}

			if ([SensorStatus.Default, SensorStatus.Normal].includes(sensor.sensorStatus)) {
				ok++;
			}
		});

		if (!this.stat.num || this.stat.on !== on || this.stat.off !== off || this.stat.ok !== ok) {
			this.stat = {num: this.sensorGroup.members.length, on, off, ok};
		}
	}
}
