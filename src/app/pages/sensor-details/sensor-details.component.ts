import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Sensor, SensorLog} from '@entities/sensors.interfaces';
import {LoadingStatus} from '@entities/store.interfaces';

@Component({
	selector: 'rpi-sensor-details-component',
	templateUrl: './sensor-details.component.html',
	styleUrls: ['./sensor-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorDetailsComponent {
	@Input() sensor: Sensor;
	@Input() logs: SensorLog[];
	@Input() loadingStatus: LoadingStatus;

	displayedColumns: string[] = ['change_time', 'state'];
}
