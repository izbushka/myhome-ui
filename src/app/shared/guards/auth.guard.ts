import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Store} from '@ngrx/store';
import {Pages} from '@shared/entities/common.interfaces';
import {AuthActions} from '@store/auth/actions';
import {AuthSelectors} from '@store/auth/selectors';
import {AppState} from '@store/rootReducer';
import {Observable} from 'rxjs';
import {map, take, withLatestFrom} from 'rxjs/operators';

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
			withLatestFrom(this.store.select(AuthSelectors.user)),
			map(([auth, user]) => {
				let allow = auth;
				if (!allow) {
					this.store.dispatch(AuthActions.unAuthorize({payload: state.url}));
				}
				if (route.routeConfig.path == Pages.DbTables && !user.authorized) {
					this.store.dispatch(AuthActions.unAuthorize({payload: ''}));
					allow = false;
				}
				return allow;
			})
		);
	}
}
