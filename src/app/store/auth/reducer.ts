import {createReducer, on} from '@ngrx/store';
import {nameOfFactory} from '@entities/nameof.constants';
import {flow, set} from '@shared/helpers/store/immutable.helper';
import {AuthActions} from '@store/auth/actions';

export interface AuthState {
	authorized: boolean;
	requestedPage: string;
	lastUpdate: number;
}

export const initialAuthState: AuthState = {
	authorized: true,
	requestedPage: null,
	lastUpdate: 0,
};

export const props = nameOfFactory<AuthState>();

export const authReducer = createReducer(
	initialAuthState,
	on(AuthActions.authorize, (state) =>
		flow(state)(set(props('authorized'), true), set(props('lastUpdate'), +Date.now()))
	),
	on(AuthActions.unAuthorize, (state, {payload}) =>
		flow(state)(
			set(props('authorized'), true),
			set(props('lastUpdate'), +Date.now()),
			set(props('requestedPage'), payload)
		)
	)
);
