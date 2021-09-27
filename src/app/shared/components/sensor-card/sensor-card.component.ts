import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Sensor} from '@entities/sensors.interfaces';

@Component({
	selector: 'rpi-sensor-card-component',
	templateUrl: './sensor-card.component.html',
	styleUrls: ['./sensor-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorCardComponent {
	@Input() sensor: Sensor;
	@Output() toDetails = new EventEmitter<number>();
}
