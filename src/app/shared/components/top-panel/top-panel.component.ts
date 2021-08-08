import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Pages} from '@entities/common.interfaces';
import {SensorGroups} from '@entities/sensors.interfaces';
import {NgChanges} from '@entities/ng-changes.types';

@Component({
	selector: 'rpi-top-panel-component',
	templateUrl: './top-panel.component.html',
	styleUrls: ['./top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPanelComponent implements OnChanges {
	@Input() isSideBarOpened: boolean;
	@Input() lastUpdate: number;

	@Output() setLeftPanelState = new EventEmitter<boolean>();
	@Output() go = new EventEmitter<string | string[]>();

	readonly pages = Pages;
	readonly groups = SensorGroups;
	isFresh = true;

	public ngOnChanges(changes: NgChanges<TopPanelComponent>): void {
		if (changes.lastUpdate) {
			this.isFresh = this.lastUpdate && this.lastUpdate + 60 > new Date().getTime() / 1000;
		}
	}

	public toggleSideBar(): void {
		this.setLeftPanelState.emit(!this.isSideBarOpened);
	}
}
