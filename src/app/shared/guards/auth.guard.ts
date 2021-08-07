import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {AuthSelectors} from '@store/auth/selectors';
import {take, tap} from 'rxjs/operators';
import {AuthActions} from '@store/auth/actions';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private store: Store<AppState>) {}

	public canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.store.select(AuthSelectors.isAuthorized).pipe(
			take(1),
			tap((auth) => {
				if (!auth) {
					this.store.dispatch(AuthActions.unAuthorize({payload: state.url}));
				}
			})
		);
	}
}
