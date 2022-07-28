import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ScheduledState, Sensor} from '@entities/sensors.interfaces';

@Component({
	selector: 'rpi-list-of-schedules-component',
	templateUrl: './list-of-schedules.component.html',
	styleUrls: ['./list-of-schedules.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListOfSchedulesComponent {
	@Input() schedules: ScheduledState[];
	@Input() sensorId: Sensor['id'];
	@Input() sensors: Record<Sensor['id'], Sensor>;
	@Output() closeModal = new EventEmitter<void>();

	@Output() readonly deleteSchedule = new EventEmitter<ScheduledState['scheduleId']>();
}
