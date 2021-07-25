import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {AuthActions} from '@store/auth/actions';
import {AuthSelectors} from '@store/auth/selectors';
import {Router} from '@angular/router';
import {Pages} from '@entities/common.interfaces';

@Injectable()
export class AuthEffects {
	authorized$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.authorize),
				withLatestFrom(this.store.select(AuthSelectors.requestedPage)),
				tap(([, requestedPage]) => {
					void this.router.navigate([requestedPage]);
				})
			),
		{dispatch: false}
	);

	unauthorized$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.unAuthorize),
				tap(() => {
					void this.router.navigate([Pages.Login]);
				})
			),
		{dispatch: false}
	);

	public constructor(private actions$: Actions, private store: Store<AppState>, private router: Router) {}
}
