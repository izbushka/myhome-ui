import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {AuthActions} from '@store/auth/actions';

@Component({
	selector: 'rpi-login-page',
	template: '<rpi-login-page-component (authorize)="authorize($event)"></rpi-login-page-component>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageContainer {
	public constructor(private store: Store<AppState>) {}

	public authorize(token: string): void {
		this.store.dispatch(AuthActions.setToken({payload: token}));
	}
}
