import {AppState} from '@store/rootReducer';
import {StoreModules} from '@entities/store.interfaces';
import {createSelector} from '@ngrx/store';
import {CommonState} from '@store/common/reducer';

export const getState = (state: AppState): CommonState => state[StoreModules.Common];

export namespace CommonSelectors {
	export const isLeftPanelOpen = createSelector(getState, (state) => state.leftPanelState);
	export const leftPanelMode = createSelector(getState, (state) => state.leftPanelMode);
}
