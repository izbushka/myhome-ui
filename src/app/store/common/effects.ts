import {Injectable} from '@angular/core';
import {LeftPanelModes, StorageKeys} from '@entities/common.interfaces';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {DataStorageService, StorageTypes} from '@shared/services/data-storage.service';
import {AuthActions} from '@store/auth/actions';
import {CommonActions} from '@store/common/actions';
import {CommonSelectors} from '@store/common/selectors';
import {AppState} from '@store/rootReducer';
import {RouterActions} from '@store/router/actions';
import {filter, map, mapTo, withLatestFrom} from 'rxjs/operators';

@Injectable()
export class CommonEffects {
	setPanelMode$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CommonActions.setLeftPanelMode),
			map(({mode}) => CommonActions.openLeftPanel({isOpen: mode === LeftPanelModes.Side}))
		)
	);

	openCloneMenu$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RouterActions.go),
			withLatestFrom(this.store.select(CommonSelectors.leftPanelMode)),
			filter(([, panelMode]) => panelMode === LeftPanelModes.Over),
			mapTo(CommonActions.openLeftPanel({isOpen: false}))
		)
	);

	appInit$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CommonActions.appInit),
			map(() => {
				const url = new URLSearchParams(window.location.search);
				let token = url.get('token');
				if (url.get('error')) {
					console.error(decodeURI(url.get('error')));
				}
				if (token) {
					this.storage.set(StorageTypes.Local, StorageKeys.Token, token);
				} else {
					token = this.storage.get<string>(StorageTypes.Local, StorageKeys.Token);
				}
				return AuthActions.setToken({payload: token});
			})
		)
	);

	constructor(private actions$: Actions, private store: Store<AppState>, private storage: DataStorageService) {}
}
