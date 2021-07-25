import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SensorGroup} from '@entities/sensors.interfaces';

@Component({
	selector: 'rpi-left-menu-component',
	templateUrl: './left-menu.component.html',
	styleUrls: ['./left-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftMenuComponent {
	@Input() groups: SensorGroup[];
}
