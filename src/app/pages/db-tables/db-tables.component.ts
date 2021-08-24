import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {ColumnsOrder, DbTables, GeneralTableData, TableSearchBy} from '@entities/administration.interfaces';
import {LoadingStatus} from '@entities/store.interfaces';
import {NgChanges} from '@entities/ng-changes.types';
import {MatTableDataSource} from '@angular/material/table';

@Component({
	selector: 'rpi-db-tables-component',
	templateUrl: './db-tables.component.html',
	styleUrls: ['./db-tables.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbTablesComponent implements OnChanges {
	@Input() table: GeneralTableData[];
	@Input() currentTable: DbTables;
	@Input() loadingStatus: LoadingStatus;

	@Output() switchTable = new EventEmitter<string>();

	readonly tables: DbTables[] = Object.values(DbTables);
	readonly searchByFiled = TableSearchBy;
	columns: string[];
	dataSource: MatTableDataSource<Record<string, string | number>>;
	searchBy: TableSearchBy = TableSearchBy.Unset;

	public ngOnChanges(changes: NgChanges<DbTablesComponent>): void {
		if (changes.table?.currentValue) {
			this.prepareTable();
		}
	}

	public applyFilter(filterValue: string): void {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	private prepareTable(): void {
		const toTheEnd = 10000;
		this.columns = Object.keys(this.table[0] ?? {}).sort(
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			(a, b) => (ColumnsOrder[a] || toTheEnd) - (ColumnsOrder[b] || toTheEnd)
		);
		this.dataSource = new MatTableDataSource(this.table);
		this.setTableFilter();
	}

	private setTableFilter(): void {
		this.dataSource.filterPredicate = (data: GeneralTableData, filter: string) => {
			switch (this.searchBy) {
				case TableSearchBy.Unset:
					const wordSeparator = '◬';
					const dataStr = Object.keys(data)
						.reduce((acc, key) => `${acc}${data[key]}${wordSeparator}`, '')
						.toLowerCase();
					const transformedFilter = filter.trim().toLowerCase();
					return dataStr.indexOf(transformedFilter) != -1;

				case TableSearchBy.ActionId:
					return filter === `${data.action_id}`;

				case TableSearchBy.SensorId:
					return filter === `${data.sensor_id}`;
			}
		};
	}
}
