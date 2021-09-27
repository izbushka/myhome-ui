import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthActions} from '@store/auth/actions';
import {AppState} from '@store/rootReducer';

@Component({
	selector: 'rpi-login-page',
	template: '<rpi-login-page-component (authorize)="authorize($event)"></rpi-login-page-component>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageContainer implements OnInit {
	constructor(private store: Store<AppState>) {}

	public ngOnInit(): void {
		this.store.dispatch(AuthActions.unAuthorize({}));
		this.store.dispatch(AuthActions.getUser.requested());
	}

	public authorize(token: string): void {
		this.store.dispatch(AuthActions.setToken({payload: token}));
	}
}
