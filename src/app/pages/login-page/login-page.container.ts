import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Store} from '@ngrx/store';
import {AuthActions} from '@store/auth/actions';
import {AuthSelectors} from '@store/auth/selectors';
import {AppState} from '@store/rootReducer';
import {RouterSelectors} from '@store/router/selectors';
import {take, withLatestFrom} from 'rxjs/operators';

@UntilDestroy()
@Component({
	selector: 'rpi-login-page',
	template: '<rpi-login-page-component (authorize)="authorize($event)"></rpi-login-page-component>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageContainer implements OnInit {
	constructor(private store: Store<AppState>) {}

	public ngOnInit(): void {
		this.store
			.select(AuthSelectors.user)
			.pipe(
				withLatestFrom(this.store.select(RouterSelectors.selectQueryParam('logout'))),
				take(1),
				untilDestroyed(this)
			)
			.subscribe(([user, logout]) => {
				if (user?.authorized) {
					this.store.dispatch(AuthActions.logout.requested());
					this.store.dispatch(AuthActions.unAuthorize({}));
				}
				if (!logout) {
					this.store.dispatch(AuthActions.authorize());
				}
			});
	}

	public authorize(token: string): void {
		this.store.dispatch(AuthActions.setToken({payload: token}));
	}
}
