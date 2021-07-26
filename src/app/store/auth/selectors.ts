import {AppState} from '@store/rootReducer';
import {StoreModules} from '@entities/store.interfaces';
import {createSelector} from '@ngrx/store';
import {AuthState} from '@store/auth/reducer';

export const getState = (state: AppState): AuthState => state[StoreModules.Auth];

export namespace AuthSelectors {
	export const isAuthorized = createSelector(getState, (state) => state.authorized);
	export const requestedPage = createSelector(getState, (state) => state.requestedPage);
	export const lastUpdate = createSelector(getState, (state) => state.lastUpdate);
	export const token = createSelector(getState, (state) => state.token);
}
