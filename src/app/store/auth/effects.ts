import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, concatMapTo, filter, map, mapTo, switchMap, tap, withLatestFrom} from 'rxjs/operators';
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
import {AuthApiService} from '@api/auth.api.service';
import {mapApiActions} from '@shared/helpers/store/effects.helper';

@Injectable()
export class AuthEffects {
	authorized$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.authorize),
			withLatestFrom(this.store.select(AuthSelectors.requestedPage), this.store.select(RouterSelectors.url)),
			map(([, requestedPage, url]) => {
				let page = requestedPage || url;
				if (page === Pages.Login) {
					page = Pages.Dashboard;
				}
				return page;
			}),
			concatMap((page) => [
				RouterActions.go({url: page}),
				// TODO: restart polling in router effects after navigation to !login
				SensorsActions.polling.start(),
			])
		)
	);

	unauthorized$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.unAuthorize),
			tap(() => {
				this.storage.delete(StorageTypes.Local, StorageKeys.Token);
			}),
			concatMapTo([
				SensorsActions.resetState(),
				SensorsActions.polling.stop(),
				RouterActions.go({url: Pages.Login}),
			])
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

	authOk$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getSensors.succeeded),
			withLatestFrom(this.store.select(RouterSelectors.url)),
			filter(([, url]) => url === Pages.Login),
			mapTo(AuthActions.authorize())
		)
	);

	getUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.getUser.requested),
			switchMap(() => this.authService.getUser().pipe(mapApiActions(AuthActions.getUser)))
		)
	);

	constructor(
		private actions$: Actions,
		private store: Store<AppState>,
		private storage: DataStorageService,
		private authService: AuthApiService
	) {}
}
