import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';
import {Sensor, SensorClasses, SensorState} from '@entities/sensors.interfaces';
import {NgChanges} from '@entities/ng-changes.types';
import {SensorsHelper} from '@shared/helpers/sensors.helper';

@Directive({
	selector: '[rpiSensorState]',
})
export class SensorStateDirective implements OnChanges {
	@Input() sensor: Sensor;

	constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

	public ngOnChanges(changes: NgChanges<SensorStateDirective>): void {
		if (changes.sensor) {
			this.setStyles();
		}
	}

	private setStyles(): void {
		const className = this.getClassByState();
		Object.values(SensorClasses).forEach((item) => {
			this.renderer.removeClass(this.hostElement.nativeElement, item);
		});

		this.renderer.addClass(this.hostElement.nativeElement, className);
	}

	private getClassByState(): SensorClasses {
		const state = SensorsHelper.getState(this.sensor);
		const normalState = SensorsHelper.getState(this.sensor, true);

		if (this.sensor.readonly) {
			if (normalState !== SensorState.Unknown) {
				return normalState === state ? SensorClasses.Good : SensorClasses.Error;
			}
			return SensorClasses.Normal;
		}

		switch (state) {
			case SensorState.On:
				return SensorClasses.On;
			case SensorState.Off:
				return SensorClasses.Off;
			case SensorState.Unknown:
				return SensorClasses.Unknown;
			case SensorState.Pending:
				return SensorClasses.Pending;
			default:
				return SensorClasses.Error;
		}
	}
}
