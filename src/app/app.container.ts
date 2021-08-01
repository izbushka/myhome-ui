import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsActions} from '@store/sensors/actions';
import {AuthActions} from '@store/auth/actions';
import {DataStorageService, StorageTypes} from '@shared/services/data-storage.service';
import {StorageKeys} from '@entities/common.interfaces';

@Component({
	selector: 'rpi-root',
	template: '<rpi-root-component></rpi-root-component>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContainer implements OnInit {
	constructor(private store: Store<AppState>, private storage: DataStorageService) {}

	public ngOnInit(): void {
		document.body.classList.remove('loading');
		const token = this.storage.get<string>(StorageTypes.Local, StorageKeys.Token);
		this.store.dispatch(AuthActions.setToken({payload: token}));
		this.store.dispatch(SensorsActions.polling.start());
	}
}
