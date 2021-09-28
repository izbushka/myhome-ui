import {createReducer, on} from '@ngrx/store';
import {nameOfFactory} from '@entities/nameof.constants';
import {flow, set} from '@shared/helpers/store/immutable.helper';
import {AuthActions} from '@store/auth/actions';
import {AuthUser} from '@shared/entities/auth.interfaces';

export interface AuthState {
	authorized: boolean;
	requestedPage: string;
	lastUpdate: number;
	token: string;
	user: AuthUser;
}

export const initialAuthState: AuthState = {
	authorized: true,
	requestedPage: null,
	lastUpdate: 0,
	token: null,
	user: null,
};

export const props = nameOfFactory<AuthState>();

export const authReducer = createReducer(
	initialAuthState,
	on(AuthActions.authorize, (state) =>
		flow(state)(set(props('authorized'), true), set(props('lastUpdate'), +Date.now()))
	),
	on(AuthActions.getUser.succeeded, (state, {payload}) => set(props('user'), payload, state)),
	on(AuthActions.setToken, (state, {payload}) => set(props('token'), payload, state)),
	on(AuthActions.removeToken, (state) => set(props('token'), null, state)),
	on(AuthActions.unAuthorize, (state, {payload}) =>
		flow(state)(
			set(props('authorized'), false),
			set(props('token'), null),
			set(props('user'), null),
			set(props('lastUpdate'), +Date.now()),
			set(props('requestedPage'), payload || state.requestedPage)
		)
	)
);
