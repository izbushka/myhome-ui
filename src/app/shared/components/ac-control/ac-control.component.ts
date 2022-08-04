import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AcFan, AcMode, AcState, AcSwing, ScheduledState, Sensor, SensorState} from '@entities/sensors.interfaces';
import {NgChanges} from '@entities/ng-changes.types';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter} from 'rxjs/operators';
import * as moment from 'moment';

@UntilDestroy()
@Component({
	selector: 'rpi-ac-control-component',
	templateUrl: './ac-control.component.html',
	styleUrls: ['./ac-control.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcControlComponent implements OnChanges {
	@Input() sensor: Sensor;

	@Output() setState = new EventEmitter<AcState>();
	@Output() addSchedule = new EventEmitter<ScheduledState<AcState>>();
	@Output() closeModal = new EventEmitter<void>();

	readonly states = SensorState;
	readonly scheduleFormControl = new FormControl<string>(moment().format('YYYY-MM-DD HH:mm:00'));
	liveUpdate = new FormControl<boolean>(true);
	acForm: FormGroup;
	state: AcState;
	modes = AcMode;
	swing = AcSwing;
	fan = AcFan;
	scheduleMode = false;

	public ngOnChanges(changes: NgChanges<AcControlComponent>): void {
		if (changes.sensor?.currentValue) {
			this.updateState();
		}
	}

	public onNoClick(): void {
		this.closeModal.emit();
	}

	public onOkClick(): void {
		if (this.scheduleMode) {
			this.addSchedule.emit({
				state: this.getAcState(this.acForm.value),
				id: this.sensor.id,
				timestamp: moment(this.scheduleFormControl.value).unix(),
			});
			return;
		}
		if (!this.liveUpdate.value) {
			this.setAcState(this.acForm.value);
		}
		this.closeModal.emit();
	}

	public acTemperatureFormat(v: number): string {
		return `${v}°C`;
	}

	public toggleSchedule(): void {
		this.scheduleMode = !this.scheduleMode;
		if (!this.scheduleMode) {
			this.liveUpdate.patchValue(false);
		}
	}

	private updateState(): void {
		if (!this.acForm) {
			this.initForm();
		}
		this.state = this.sensor.jsonState as AcState;
		this.acForm.patchValue(
			{
				...this.state,
				turbo: this.state.turbo === SensorState.On,
				state: this.state.state === SensorState.On,
			},
			{emitEvent: false}
		);
	}

	private initForm() {
		this.acForm = new FormGroup({
			state: new FormControl<string>(''),
			temperature: new FormControl<string>(''),
			mode: new FormControl<string>(''),
			fan: new FormControl<string>(''),
			swing: new FormControl<string>(''),
			turbo: new FormControl<string>(''),
		});

		this.acForm.valueChanges
			.pipe(
				filter(() => this.liveUpdate.value),
				untilDestroyed(this)
			)
			.subscribe((values: AcState) => {
				this.setAcState(values);
			});
	}

	private getAcState(state: AcState): AcState {
		return {
			...state,
			turbo: state.turbo ? SensorState.On : SensorState.Off,
			state: state.state ? SensorState.On : SensorState.Off,
		};
	}

	private setAcState(state: AcState): void {
		this.setState.emit(this.getAcState(state));
	}
}
