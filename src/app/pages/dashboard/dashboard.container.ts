import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsActions} from '@store/sensors/actions';

@Component({
	selector: 'rpi-dashboard',
	template: '<rpi-dashboard-component></rpi-dashboard-component>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardContainer implements OnInit {
	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(SensorsActions.getSensors.requested());
	}
}
