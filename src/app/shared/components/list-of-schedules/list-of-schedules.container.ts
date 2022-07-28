import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import {AppState} from '@store/rootReducer';
import {Store} from '@ngrx/store';
import {ScheduledState, Sensor} from '@entities/sensors.interfaces';
import {Observable} from 'rxjs';
import {NgChanges} from '@entities/ng-changes.types';
import {SensorsSelectors} from '@store/sensors/selectors';
import {SensorsActions} from '@store/sensors/actions';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
	selector: 'rpi-list-of-schedules',
	template: `
		<rpi-list-of-schedules-component
			[schedules]="schedules$ | async"
			[sensorId]="sensorId"
			[sensors]="sensors$ | async"
			(deleteSchedule)="deleteSchedule($event)"
			(closeModal)="closeModal()"
		>
		</rpi-list-of-schedules-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListOfSchedulesContainer implements OnChanges, OnInit {
	@Input() sensorId: Sensor['id'];

	schedules$: Observable<ScheduledState[]>;
	sensors$: Observable<Record<Sensor['id'], Sensor>>;

	constructor(private store: Store<AppState>, private dialogRef: MatDialogRef<ListOfSchedulesContainer>) {
		this.sensors$ = this.store.select(SensorsSelectors.sensors.map);
		this.schedules$ = this.store.select(SensorsSelectors.schedules);
	}

	public ngOnInit(): void {
		this.store.dispatch(SensorsActions.getSchedules.requested());
	}

	public ngOnChanges(changes: NgChanges<ListOfSchedulesContainer>): void {
		if (changes.sensorId) {
			this.schedules$ = this.sensorId
				? this.store.select(SensorsSelectors.sensorSchedules(this.sensorId))
				: this.store.select(SensorsSelectors.schedules);
		}
	}

	public deleteSchedule(scheduleId: ScheduledState['scheduleId']): void {
		this.store.dispatch(SensorsActions.deleteSchedule.requested({scheduleId}));
	}

	public closeModal(): void {
		this.dialogRef.close();
	}
}
