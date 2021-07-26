import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsActions} from '@store/sensors/actions';

@Component({
	selector: 'rpi-root',
	template: '<rpi-root-component></rpi-root-component>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContainer implements OnInit {
	constructor(private store: Store<AppState>) {}

	public ngOnInit(): void {
		this.store.dispatch(SensorsActions.polling.start());
	}
}
