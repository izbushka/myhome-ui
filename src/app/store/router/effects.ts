import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '@store/rootReducer';
import {Store} from '@ngrx/store';
import {tap, withLatestFrom} from 'rxjs/operators';
import {RouterActions} from '@store/router/actions';

@Injectable()
export class RouterEffects {
	go$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(RouterActions.go),
				tap(({url, extras}) => {
					if (url || url === '') {
						void this.router.navigate(Array.isArray(url) ? url : [url], extras || {});
					}
				})
			),
		{
			dispatch: false,
		}
	);

	public constructor(
		private actions$: Actions,
		private router: Router,
		private route: ActivatedRoute,
		private store: Store<AppState>
	) {}
}
