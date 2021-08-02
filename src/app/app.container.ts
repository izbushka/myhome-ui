import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsActions} from '@store/sensors/actions';
import {AuthActions} from '@store/auth/actions';
import {DataStorageService, StorageTypes} from '@shared/services/data-storage.service';
import {LeftPanelModes, StorageKeys} from '@entities/common.interfaces';
import {Observable} from 'rxjs';
import {CommonSelectors} from '@store/common/selectors';
import {CommonActions} from '@store/common/actions';

@Component({
	selector: 'rpi-root',
	template: `
		<rpi-root-component
			[isSideBarOpened]="leftMenuOpened$ | async"
			[sideBarMode]="sideBarMode$ | async"
			(setLeftPanelState)="setLeftPanelState($event)"
		></rpi-root-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContainer implements OnInit {
	readonly leftMenuOpened$: Observable<boolean>;
	readonly sideBarMode$: Observable<LeftPanelModes>;

	constructor(private store: Store<AppState>, private storage: DataStorageService) {
		this.leftMenuOpened$ = this.store.select(CommonSelectors.isLeftPanelOpen);
		this.sideBarMode$ = this.store.select(CommonSelectors.leftPanelMode);
	}

	public ngOnInit(): void {
		document.body.classList.remove('loading');
		const token = this.storage.get<string>(StorageTypes.Local, StorageKeys.Token);
		this.store.dispatch(AuthActions.setToken({payload: token}));
		this.store.dispatch(SensorsActions.polling.start());
	}

	public setLeftPanelState(state: boolean): void {
		this.store.dispatch(CommonActions.openLeftPanel({isOpen: state}));
	}
}
