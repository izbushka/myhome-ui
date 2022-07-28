import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ScheduledState, Sensor, SensorState} from '@entities/sensors.interfaces';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';

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

	form = new FormGroup({
		state: new FormControl(false),
		date: new FormControl(moment().format('YYYY-MM-DD HH:mm:00')),
	});

	public setSchedule(): void {
		const schedule: ScheduledState = {
			id: this.sensor.id,
			timestamp: moment(this.form.controls.date.value).unix(),
			state: this.form.controls.state.value ? SensorState.On : SensorState.Off,
		};
		this.setState.emit(schedule);
	}

	public formatSlider(v: number): string {
		return `${v} min`;
	}

	public addMinutes(minutes: number): void {
		const now = moment();
		this.form.controls.date.patchValue(now.add(minutes, 'minutes').format('YYYY-MM-DD HH:mm:00'));
	}
}
