import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {Observable} from 'rxjs';
import {SensorGroup} from '@entities/sensors.interfaces';
import {SensorsSelectors} from '@store/sensors/selectors';
import {RouterActions} from '@store/router/actions';
import {LeftPanelModes, Pages} from '@entities/common.interfaces';
import {CommonActions} from '@store/common/actions';
import {AuthUser} from '@shared/entities/auth.interfaces';
import {AuthSelectors} from '@store/auth/selectors';
import {AuthActions} from '@store/auth/actions';

@Component({
	selector: 'rpi-left-menu',
	template: `
		<rpi-left-menu-component
			[groups]="sensorGroups$ | async"
			[user]="user$ | async"
			(go)="go($event)"
			(setMode)="setMode($event)"
		></rpi-left-menu-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftMenuContainer implements OnInit {
	sensorGroups$: Observable<SensorGroup[]>;
	user$: Observable<AuthUser>;

	constructor(private store: Store<AppState>) {
		this.sensorGroups$ = this.store.select(SensorsSelectors.sensorGroups.list);
		this.user$ = this.store.select(AuthSelectors.user);
	}

	public ngOnInit(): void {
		this.store.dispatch(AuthActions.getUser.requested());
	}

	public go(page: string | string[]): void {
		if (page == Pages.Login) {
			this.store.dispatch(RouterActions.go({url: page, extras: {queryParams: {logout: 1}}}));

			return;
		}
		this.store.dispatch(RouterActions.go({url: page}));
	}

	public setMode(mode: LeftPanelModes): void {
		this.store.dispatch(CommonActions.setLeftPanelMode({mode}));
	}
}
