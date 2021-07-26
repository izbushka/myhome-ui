import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {mapTo, tap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {AuthActions} from '@store/auth/actions';
import {AuthSelectors} from '@store/auth/selectors';
import {Router} from '@angular/router';
import {Pages} from '@entities/common.interfaces';
import {SensorsActions} from '@store/sensors/actions';

@Injectable()
export class AuthEffects {
	authorized$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.authorize),
			withLatestFrom(this.store.select(AuthSelectors.requestedPage)),
			tap(([, requestedPage]) => {
				void this.router.navigate([requestedPage || Pages.Dashboard]);
			}),
			// TODO: restart polling in router effects after navigation to not login
			mapTo(SensorsActions.polling.start())
		)
	);

	unauthorized$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.unAuthorize),
				tap(() => {
					// TODO: why timeout?
					setTimeout(() => {
						void this.router.navigate([Pages.Login]);
					}, 100);
				})
			),
		{dispatch: false}
	);

	setToken$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.setToken),
			// authorize
			mapTo(AuthActions.authorize())
		)
	);

	public constructor(private actions$: Actions, private store: Store<AppState>, private router: Router) {}
}
