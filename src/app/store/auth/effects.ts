import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, mapTo, tap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {AuthActions} from '@store/auth/actions';
import {AuthSelectors} from '@store/auth/selectors';
import {Pages, StorageKeys} from '@entities/common.interfaces';
import {SensorsActions} from '@store/sensors/actions';
import {RouterActions} from '@store/router/actions';
import {DataStorageService, StorageTypes} from '@shared/services/data-storage.service';
import {AUTH_EXPIRATION_TIME} from '@entities/common.constants';
import {RouterSelectors} from '@store/router/selectors';

@Injectable()
export class AuthEffects {
	authorized$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.authorize),
			withLatestFrom(
				this.store.select(AuthSelectors.requestedPage),
				this.store.select(RouterSelectors.selectUrl)
			),
			concatMap(([, requestedPage, url]) => [
				RouterActions.go({url: requestedPage || url || Pages.Dashboard}),
				// TODO: restart polling in router effects after navigation to !login
				SensorsActions.polling.start(),
			])
		)
	);

	unauthorized$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.unAuthorize),
			// to login page
			mapTo(RouterActions.go({url: Pages.Login}))
		)
	);

	setToken$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.setToken),
			tap(({payload}) => {
				if (payload) {
					this.storage.set<string>(StorageTypes.Local, StorageKeys.Token, payload, AUTH_EXPIRATION_TIME);
				}
			}),
			// authorize
			mapTo(AuthActions.authorize())
		)
	);

	public constructor(
		private actions$: Actions,
		private store: Store<AppState>,
		private storage: DataStorageService
	) {}
}
