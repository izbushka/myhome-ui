import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MappedSensors, SensorGroup} from '@entities/sensors.interfaces';
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
}
