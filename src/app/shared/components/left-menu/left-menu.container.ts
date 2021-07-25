import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {Observable} from 'rxjs';
import {SensorGroup} from '@entities/sensors.interfaces';
import {SensorsSelectors} from '@store/sensors/selectors';

@Component({
	selector: 'rpi-left-menu',
	template: '<rpi-left-menu-component [groups]="sensorGroups$ | async"></rpi-left-menu-component>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftMenuContainer {
	sensorGroups$: Observable<SensorGroup[]>;

	public constructor(private store: Store<AppState>) {
		this.sensorGroups$ = this.store.select(SensorsSelectors.sensorGroups.list);
	}
}
