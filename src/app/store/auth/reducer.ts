import {createReducer, on} from '@ngrx/store';
import {nameOfFactory} from '@entities/nameof.constants';
import {flow, set} from '@shared/helpers/store/immutable.helper';
import {AuthActions} from '@store/auth/actions';

export interface AuthState {
	authorized: boolean;
	requestedPage: string;
	lastUpdate: number;
	token: string;
}

export const initialAuthState: AuthState = {
	authorized: true,
	requestedPage: null,
	lastUpdate: 0,
	token: null,
};

export const props = nameOfFactory<AuthState>();

export const authReducer = createReducer(
	initialAuthState,
	on(AuthActions.authorize, (state) =>
		flow(state)(set(props('authorized'), true), set(props('lastUpdate'), +Date.now()))
	),
	on(AuthActions.setToken, (state, {payload}) => set(props('token'), payload, state)),
	on(AuthActions.unAuthorize, (state, {payload}) =>
		flow(state)(
			set(props('authorized'), false),
			set(props('lastUpdate'), +Date.now()),
			set(props('requestedPage'), payload)
		)
	)
);
