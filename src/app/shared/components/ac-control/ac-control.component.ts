import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AcFan, AcMode, AcState, AcSwing, Sensor, SensorState} from '@entities/sensors.interfaces';
import {SensorsHelper} from '@shared/helpers/sensors.helper';
import {NgChanges} from '@entities/ng-changes.types';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter} from 'rxjs/operators';

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
	@Output() closeModal = new EventEmitter<void>();

	public readonly states = SensorState;
	public liveUpdate = new FormControl(true);
	public acForm: FormGroup;
	public state: AcState;
	public modes = AcMode;
	public swing = AcSwing;
	public fan = AcFan;

	public ngOnChanges(changes: NgChanges<AcControlComponent>): void {
		if (changes.sensor?.currentValue) {
			this.updateState();
		}
	}

	public onNoClick(): void {
		this.closeModal.emit();
	}

	public onOkClick(): void {
		if (!this.liveUpdate.value) {
			this.setAcState(this.acForm.value);
		}
		this.closeModal.emit();
	}

	public acTemperatureFormat(v: number): string {
		return `${v}°C`;
	}

	private updateState(): void {
		if (!this.acForm) {
			this.initForm();
		}
		this.state = SensorsHelper.getFullState<AcState>(this.sensor);
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
			state: new FormControl(''),
			temperature: new FormControl(''),
			mode: new FormControl(''),
			fan: new FormControl(''),
			swing: new FormControl(''),
			turbo: new FormControl(''),
		});

		this.acForm.valueChanges
			.pipe(
				filter(() => this.liveUpdate.value as boolean),
				untilDestroyed(this)
			)
			.subscribe((values: AcState) => {
				this.setAcState(values);
			});
	}

	private setAcState(state: AcState): void {
		this.setState.emit({
			...state,
			turbo: state.turbo ? SensorState.On : SensorState.Off,
			state: state.state ? SensorState.On : SensorState.Off,
		});
	}
}
