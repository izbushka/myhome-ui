import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppState} from '@store/rootReducer';
import {Store} from '@ngrx/store';
import {ScheduledState, Sensor} from '@entities/sensors.interfaces';
import {SensorsActions} from '@store/sensors/actions';
import {Observable} from 'rxjs';
import {SensorsSelectors} from '@store/sensors/selectors';
import * as moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
	selector: 'rpi-schedule-state',
	template: `
		<rpi-schedule-state-component
			[sensor]="sensor"
			[schedules]="schedules$ | async"
			(setState)="setState($event)"
			(closeModal)="closeModal()"
		></rpi-schedule-state-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleStateContainer {
	schedules$: Observable<ScheduledState[]>;

	constructor(
		private dialogRef: MatDialogRef<ScheduleStateContainer>,
		private store: Store<AppState>,
		private snackBar: MatSnackBar,
		@Inject(MAT_DIALOG_DATA) public sensor: Sensor
	) {
		this.schedules$ = this.store.select(SensorsSelectors.sensorSchedules(this.sensor.id));
	}

	public closeModal(): void {
		this.dialogRef.close();
	}

	public setState(state: ScheduledState): void {
		const scheduledTime = state.timestamp;
		if (scheduledTime <= moment().unix()) {
			this.snackBar.open('Scheduled time is in the past', null, {duration: 3000});
			return;
		}
		this.store.dispatch(SensorsActions.addSchedule.requested({payload: state}));
	}
}
