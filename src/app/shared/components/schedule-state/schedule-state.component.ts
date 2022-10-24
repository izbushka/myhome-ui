import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ScheduledState, ScheduleRepeat, Sensor, SensorState} from '@entities/sensors.interfaces';
import * as moment from 'moment';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
	selector: 'rpi-schedule-state-component',
	templateUrl: './schedule-state.component.html',
	styleUrls: ['./schedule-state.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleStateComponent {
	@Input() sensor: Sensor;
	@Input() schedules: ScheduledState[];

	@Output() setState = new EventEmitter<ScheduledState>();
	@Output() closeModal = new EventEmitter<void>();

	repeatValues = Object.values(ScheduleRepeat);

	form = new FormGroup({
		state: new FormControl<boolean>(false),
		date: new FormControl<string>(moment().format('YYYY-MM-DD HH:mm:00')),
		repeat: new FormControl<ScheduleRepeat>(ScheduleRepeat.NoRepeat),
	});

	public setSchedule(): void {
		const schedule: ScheduledState = {
			id: this.sensor.id,
			timestamp: moment(this.form.controls.date.value).unix(),
			state: this.form.controls.state.value ? SensorState.On : SensorState.Off,
			repeat: this.form.controls.repeat.value || null,
		};
		this.setState.emit(schedule);
	}
}
