import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LeftPanelModes, Pages} from '@entities/common.interfaces';
import {SensorGroup} from '@entities/sensors.interfaces';
import {Store} from '@ngrx/store';
import {AuthUser} from '@shared/entities/auth.interfaces';
import {AuthSelectors} from '@store/auth/selectors';
import {CommonActions} from '@store/common/actions';
import {AppState} from '@store/rootReducer';
import {RouterActions} from '@store/router/actions';
import {SensorsSelectors} from '@store/sensors/selectors';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ListOfSchedulesContainer} from '@shared/components/list-of-schedules/list-of-schedules.container';

@Component({
	selector: 'rpi-left-menu',
	template: `
		<rpi-left-menu-component
			[groups]="sensorGroups$ | async"
			[user]="user$ | async"
			(go)="go($event)"
			(showSchedules)="showSchedules()"
			(setMode)="setMode($event)"
		></rpi-left-menu-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftMenuContainer {
	sensorGroups$: Observable<SensorGroup[]>;
	user$: Observable<AuthUser>;

	constructor(private store: Store<AppState>, private dialog: MatDialog) {
		this.sensorGroups$ = this.store.select(SensorsSelectors.sensorGroups.list);
		this.user$ = this.store.select(AuthSelectors.user);
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

	public showSchedules(): void {
		this.dialog.open(ListOfSchedulesContainer, {
			width: '500px',
			height: 'fit-content',
			data: {id: null},
		});
	}
}
