import {Injectable} from '@angular/core';
import {AuthApiService} from '@api/auth.api.service';
import {AUTH_EXPIRATION_TIME} from '@entities/common.constants';
import {Pages, StorageKeys} from '@entities/common.interfaces';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {mapApiActions} from '@shared/helpers/store/effects.helper';
import {DataStorageService, StorageTypes} from '@shared/services/data-storage.service';
import {AuthActions} from '@store/auth/actions';
import {AuthSelectors} from '@store/auth/selectors';
import {AppState} from '@store/rootReducer';
import {RouterActions} from '@store/router/actions';
import {RouterSelectors} from '@store/router/selectors';
import {SensorsActions} from '@store/sensors/actions';
import {of} from 'rxjs';
import {catchError, concatMap, concatMapTo, filter, map, mapTo, switchMap, tap, withLatestFrom} from 'rxjs/operators';

@Injectable()
export class AuthEffects {
	authorized$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.getUser.succeeded),
			withLatestFrom(this.store.select(AuthSelectors.requestedPage), this.store.select(RouterSelectors.url)),
			map(([, requestedPage, url]) => {
				let page = requestedPage || url;
				if (page === Pages.Login || !page) {
					page = Pages.Sensors;
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

	authorize$ = createEffect(() =>
		this.actions$.pipe(ofType(AuthActions.authorize), mapTo(AuthActions.getUser.requested()))
	);

	unauthorized$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.unAuthorize),
			tap(() => {
				this.storage.delete(StorageTypes.Local, StorageKeys.Token);
			}),
			concatMapTo([
				AuthActions.logout.requested(),
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

	getUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.getUser.requested),
			switchMap(() => this.authService.getUser().pipe(mapApiActions(AuthActions.getUser)))
		)
	);

	logout$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.logout.requested),
			withLatestFrom(this.store.select(AuthSelectors.token)),
			filter(([, token]) => !!token),
			switchMap(() =>
				this.authService.logout().pipe(
					map(() => AuthActions.removeToken()),
					catchError((error: string) => {
						console.error('logged out', error);
						return of(AuthActions.removeToken());
					})
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private store: Store<AppState>,
		private storage: DataStorageService,
		private authService: AuthApiService
	) {}
}
