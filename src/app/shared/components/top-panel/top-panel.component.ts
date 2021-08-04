import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Pages, SensorGroups} from '@entities/common.interfaces';

@Component({
	selector: 'rpi-top-panel-component',
	templateUrl: './top-panel.component.html',
	styleUrls: ['./top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPanelComponent {
	@Input() isSideBarOpened: boolean;

	@Output() setLeftPanelState = new EventEmitter<boolean>();
	@Output() go = new EventEmitter<string | string[]>();

	readonly pages = Pages;
	readonly groups = SensorGroups;

	public toggleSideBar(): void {
		this.setLeftPanelState.emit(!this.isSideBarOpened);
	}
}
