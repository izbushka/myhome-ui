import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';
import {Sensor, SensorClasses, SensorState, SensorStatus} from '@entities/sensors.interfaces';
import {NgChanges} from '@entities/ng-changes.types';

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
		if (this.sensor.readonly) {
			switch (this.sensor.sensorStatus) {
				case SensorStatus.Default:
					return SensorClasses.Default;
				case SensorStatus.Error:
					return SensorClasses.Error;
				case SensorStatus.Abnormal:
					return SensorClasses.Abnormal;
				case SensorStatus.Normal:
					return SensorClasses.Normal;
			}
		}

		switch (this.sensor.sensorState) {
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
