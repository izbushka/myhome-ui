import {createReducer, on} from '@ngrx/store';
import {nameOfFactory} from '@entities/nameof.constants';
import {flow, set} from '@shared/helpers/store/immutable.helper';
import {DbTablesData} from '@entities/administration.interfaces';
import {LoadingStatus, status} from '@entities/store.interfaces';
import {DbTablesActions} from '@store/db-tables/actions';

export interface DbTablesState {
	tables: DbTablesData;
	tablesLoadingStatus: LoadingStatus;
}

export const initialDbTablesState: DbTablesState = {
	tables: {},
	tablesLoadingStatus: status.default,
};

export const props = nameOfFactory<DbTablesState>();

export const dbTablesReducer = createReducer(
	initialDbTablesState,
	on(DbTablesActions.getTable.requested, (state, {table}) =>
		flow(state)(
			set(props('tablesLoadingStatus'), status.loading),
			set([props('tables'), table], state.tables[table] ?? [])
		)
	),
	on(DbTablesActions.getTable.succeeded, (state, {table, data}) =>
		flow(state)(set(props('tablesLoadingStatus'), status.loaded), set([props('tables'), table], data))
	),
	on(DbTablesActions.getTable.failed, (state, {error}) =>
		set(props('tablesLoadingStatus'), status.error(error), state)
	)
);
