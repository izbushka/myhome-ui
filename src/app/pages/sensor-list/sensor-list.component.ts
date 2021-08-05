import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MappedSensors, Sensor, SensorGroup} from '@entities/sensors.interfaces';
import {LoadingStatus} from '@entities/store.interfaces';

@Component({
	selector: 'rpi-sensor-list-component',
	templateUrl: './sensor-list.component.html',
	styleUrls: ['./sensor-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorListComponent {
	@Input() sensorGroups: SensorGroup[];
	@Input() sensors: MappedSensors;
	@Input() loadingStatus: LoadingStatus;

	public trackSensorId(i: number, sensorId: Sensor['sensor_id']): Sensor['sensor_id'] {
		return sensorId;
	}

	public trackGroup(i: number, group: SensorGroup): Sensor['group'] {
		return group.name;
	}
}
