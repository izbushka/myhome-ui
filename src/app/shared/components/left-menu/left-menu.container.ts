import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {Observable} from 'rxjs';
import {SensorGroup} from '@entities/sensors.interfaces';
import {SensorsSelectors} from '@store/sensors/selectors';
import {RouterActions} from '@store/router/actions';
import {LeftPanelModes} from '@entities/common.interfaces';
import {CommonActions} from '@store/common/actions';

@Component({
	selector: 'rpi-left-menu',
	template: `
		<rpi-left-menu-component
			[groups]="sensorGroups$ | async"
			(go)="go($event)"
			(setMode)="setMode($event)"
		></rpi-left-menu-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftMenuContainer {
	sensorGroups$: Observable<SensorGroup[]>;

	constructor(private store: Store<AppState>) {
		this.sensorGroups$ = this.store.select(SensorsSelectors.sensorGroups.list);
	}

	public go(page: string | string[]): void {
		this.store.dispatch(RouterActions.go({url: page}));
	}

	public setMode(mode: LeftPanelModes): void {
		this.store.dispatch(CommonActions.setLeftPanelMode({mode}));
	}
}
