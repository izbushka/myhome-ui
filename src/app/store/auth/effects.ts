import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, mapTo, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {AuthActions} from '@store/auth/actions';
import {AuthSelectors} from '@store/auth/selectors';
import {Router} from '@angular/router';
import {Pages} from '@entities/common.interfaces';
import {SensorsActions} from '@store/sensors/actions';
import {RouterActions} from '@store/router/actions';

@Injectable()
export class AuthEffects {
	authorized$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.authorize),
			withLatestFrom(this.store.select(AuthSelectors.requestedPage)),
			concatMap(([, requestedPage]) => [
				RouterActions.go({url: requestedPage || Pages.Dashboard}),
				// TODO: restart polling in router effects after navigation to not login
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
			// authorize
			mapTo(AuthActions.authorize())
		)
	);

	public constructor(private actions$: Actions, private store: Store<AppState>) {}
}
