import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MappedSensors, SensorGroup} from '@entities/sensors.interfaces';

@Component({
	selector: 'rpi-dashboard-component',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
	@Input() sensors: MappedSensors;
	@Input() sensorGroups: SensorGroup[];
}
