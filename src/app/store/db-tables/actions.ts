import {props} from '@ngrx/store';
import {StoreModules} from '@entities/store.interfaces';
import {getActionDescription, getApiActions, getApiActionsWithPayload} from '@shared/helpers/store/actions.helper';
import {DbTables, GeneralTableData} from '@entities/administration.interfaces';

const desc = getActionDescription(StoreModules.DbTables);

export const DbTablesActions = {
	getTable: getApiActionsWithPayload(
		desc('Get Table Structure'),
		props<{table: DbTables}>(),
		props<{table: DbTables; data: GeneralTableData[]}>()
	),
	getCombinedTable: getApiActions(
		desc('Get Tables For Combined Data'),
		props<{table: DbTables; data: GeneralTableData[]}>()
	),
};
