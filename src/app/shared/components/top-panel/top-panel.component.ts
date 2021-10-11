import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Pages} from '@entities/common.interfaces';
import {SensorGroups} from '@entities/sensors.interfaces';
import {NgChanges} from '@entities/ng-changes.types';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'rpi-top-panel-component',
	templateUrl: './top-panel.component.html',
	styleUrls: ['./top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPanelComponent implements OnChanges, OnInit {
	@Input() isSideBarOpened: boolean;
	@Input() curPage: Pages;
	@Input() lastUpdate: number;

	@Output() setLeftPanelState = new EventEmitter<boolean>();
	@Output() go = new EventEmitter<string | string[]>();
	@Output() doSearch = new EventEmitter<string>();

	ctrl = new FormControl();
	readonly pages = Pages;
	readonly groups = SensorGroups;
	isFresh = true;

	public ngOnInit(): void {
		this.ctrl.valueChanges.pipe(debounceTime(200), untilDestroyed(this)).subscribe((val: string) => {
			this.doSearch.emit(val.toLowerCase());
		});
	}

	public ngOnChanges(changes: NgChanges<TopPanelComponent>): void {
		if (changes.lastUpdate) {
			this.isFresh = this.lastUpdate && this.lastUpdate + 60 > new Date().getTime() / 1000;
		}
	}

	public toggleSideBar(): void {
		this.setLeftPanelState.emit(!this.isSideBarOpened);
	}
}
