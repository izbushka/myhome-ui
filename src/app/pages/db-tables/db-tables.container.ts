import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AppState} from '@store/rootReducer';
import {Store} from '@ngrx/store';
import {DbTablesActions} from '@store/db-tables/actions';
import {DbTables, DbTablesData} from '@entities/administration.interfaces';
import {Observable} from 'rxjs';
import {DbTablesSelectors} from '@store/db-tables/selectors';
import {RouterSelectors} from '@store/router/selectors';
import {PageParams, Pages} from '@entities/common.interfaces';
import {LoadingStatus} from '@entities/store.interfaces';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {RouterActions} from '@store/router/actions';

@UntilDestroy()
@Component({
	selector: 'rpi-db-tables',
	template: `
		<rpi-db-tables-component
			[table]="(tables$ | async)?.[currentTable]"
			[currentTable]="currentTable"
			[loadingStatus]="loadingStatus$ | async"
			(switchTable)="showTable($event)"
		>
		</rpi-db-tables-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbTablesContainer {
	tables$: Observable<DbTablesData>;
	loadingStatus$: Observable<LoadingStatus>;
	currentTable: DbTables;

	constructor(private store: Store<AppState>) {
		this.tables$ = this.store.select(DbTablesSelectors.tables);
		this.loadingStatus$ = this.store.select(DbTablesSelectors.loadingStatus);
		this.store
			.select(RouterSelectors.selectRouteParam(PageParams.Table))
			.pipe(untilDestroyed(this))
			.subscribe((page) => {
				this.currentTable = page as DbTables;
				if (this.currentTable) {
					this.store.dispatch(DbTablesActions.getTable.requested({table: this.currentTable}));
				}
			});
	}

	public showTable(table: string): void {
		this.store.dispatch(RouterActions.go({url: [Pages.DbTables, table]}));
	}
}
