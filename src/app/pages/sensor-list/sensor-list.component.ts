import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'rpi-sensor-list-component',
	templateUrl: './sensor-list.component.html',
	styleUrls: ['./sensor-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorListComponent {}
