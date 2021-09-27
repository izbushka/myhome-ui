import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SensorGroup} from '@entities/sensors.interfaces';
import {LeftPanelModes, Pages} from '@entities/common.interfaces';
import {fromEvent} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {debounceTime} from 'rxjs/operators';
import {AuthUser} from '@shared/entities/auth.interfaces';

@UntilDestroy()
@Component({
	selector: 'rpi-left-menu-component',
	templateUrl: './left-menu.component.html',
	styleUrls: ['./left-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftMenuComponent implements OnInit {
	@Input() groups: SensorGroup[];
	@Input() user: AuthUser;
	@Output() go = new EventEmitter<string | string[]>();

	@Output() setMode = new EventEmitter<LeftPanelModes>();

	readonly pages = Pages;

	public ngOnInit(): void {
		this.setMode.emit(this.menuMode());
		this.onResize();
	}

	private onResize(): void {
		fromEvent(window, 'resize')
			.pipe(untilDestroyed(this), debounceTime(200))
			.subscribe(() => {
				this.setMode.emit(this.menuMode());
			});
	}

	private menuMode(): LeftPanelModes {
		const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		return width > 1200 ? LeftPanelModes.Side : LeftPanelModes.Over;
	}
}
