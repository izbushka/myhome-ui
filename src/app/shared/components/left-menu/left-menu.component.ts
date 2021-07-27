import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {SensorGroup} from '@entities/sensors.interfaces';
import {Pages} from '@entities/common.interfaces';

@Component({
	selector: 'rpi-left-menu-component',
	templateUrl: './left-menu.component.html',
	styleUrls: ['./left-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftMenuComponent {
	@Input() groups: SensorGroup[];
	@Output() go = new EventEmitter<string | string[]>();

	readonly pages = Pages;
}
