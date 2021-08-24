import {AppState} from '@store/rootReducer';
import {StoreModules} from '@entities/store.interfaces';
import {DbTablesState} from '@store/db-tables/reducer';
import {createSelector} from '@ngrx/store';

export const getState = (state: AppState): DbTablesState => state[StoreModules.DbTables];

export namespace DbTablesSelectors {
	// export const tables = createStateSelector(getState, 'tables');
	export const tables = createSelector(getState, (state) => state?.tables);
	export const loadingStatus = createSelector(getState, (state) => state?.tablesLoadingStatus);
}
