import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {LeftPanelModes} from '@entities/common.interfaces';
import {Observable} from 'rxjs';
import {CommonSelectors} from '@store/common/selectors';
import {CommonActions} from '@store/common/actions';
import {SensorsActions} from '@store/sensors/actions';

@Component({
	selector: 'rpi-root',
	template: `
		<rpi-root-component
			[isSideBarOpened]="leftMenuOpened$ | async"
			[sideBarMode]="sideBarMode$ | async"
		></rpi-root-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContainer implements OnInit {
	readonly leftMenuOpened$: Observable<boolean>;
	readonly sideBarMode$: Observable<LeftPanelModes>;

	constructor(private store: Store<AppState>) {
		this.leftMenuOpened$ = this.store.select(CommonSelectors.isLeftPanelOpen);
		this.sideBarMode$ = this.store.select(CommonSelectors.leftPanelMode);
	}

	@HostListener('document:visibilitychange', ['$event'])
	private visibilitychange(): void {
		if (!document.hidden) {
			this.store.dispatch(SensorsActions.polling.start());
		}
	}

	public ngOnInit(): void {
		document.body.classList.remove('loading');
		this.store.dispatch(CommonActions.appInit());
	}
}
