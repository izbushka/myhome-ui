import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, first, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {DbTablesActions} from '@store/db-tables/actions';
import {AdministrationApiService} from '@api/administration.api.service';
import {of} from 'rxjs';
import {DbTables} from '@entities/administration.interfaces';
import {DbTablesSelectors} from '@store/db-tables/selectors';

@Injectable()
export class DbTablesEffects {
	getTables$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DbTablesActions.getTable.requested),
			mergeMap(({table}) =>
				table === DbTables.SensorsActionsCombined
					? of(DbTablesActions.getCombinedTable.requested())
					: this.administrationApiService.getTable(table).pipe(
							map((data) => DbTablesActions.getTable.succeeded({table, data})),
							catchError((error: string) => of(DbTablesActions.getTable.failed({error: `${error}`})))
					  )
			)
		)
	);

	getCombinedTable$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DbTablesActions.getCombinedTable.requested),
			tap(() => {
				this.store.dispatch(DbTablesActions.getTable.requested({table: DbTables.Actions}));
				this.store.dispatch(DbTablesActions.getTable.requested({table: DbTables.Sensors}));
				this.store.dispatch(DbTablesActions.getTable.requested({table: DbTables.SensorsActions}));
			}),
			switchMap(() =>
				this.actions$.pipe(
					ofType(DbTablesActions.getTable.succeeded),
					withLatestFrom(this.store.select(DbTablesSelectors.tables)),
					first(
						([, tables]) =>
							tables.sensors?.length > 0 &&
							tables.actions?.length > 0 &&
							tables.sensors_actions?.length > 0
					),
					map(([, tables]) => {
						const sensorsMap = tables.sensors.reduce(
							(acc, item) => ({...acc, [item.sensor_id]: item.name}),
							{}
						);
						const actionsMap = tables.actions.reduce(
							(acc, item) => ({...acc, [item.action_id]: `${item.name} ${item.command}`}),
							{}
						);
						const resultTable = tables.sensors_actions.map((line) => ({
							sensorName: sensorsMap[line.sensor_id],
							actionName: actionsMap[line.action_id],
							...line,
						}));

						return DbTablesActions.getTable.succeeded({
							table: DbTables.SensorsActionsCombined,
							data: resultTable,
						});
					})
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private store: Store<AppState>,
		private administrationApiService: AdministrationApiService
	) {}
}
