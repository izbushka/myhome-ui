import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {DbTables, GeneralTableData, TableEditorPayload, TableSearchBy} from '@entities/administration.interfaces';
import {NgChanges} from '@entities/ng-changes.types';
import {LoadingStatus} from '@entities/store.interfaces';
import {DbTablesHelper} from '@shared/helpers/db-tables/db-tables.helper';
import {TableEditorContainer} from './table-editor/table-editor.container';

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

	constructor(public dialog: MatDialog) {}

	public ngOnChanges(changes: NgChanges<DbTablesComponent>): void {
		if (changes.table?.currentValue) {
			this.prepareTable();
		}
	}

	public applyFilter(filterValue: string): void {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	public openEditor(row: GeneralTableData): void {
		const data: TableEditorPayload = {data: row, name: this.currentTable};
		this.dialog.open(TableEditorContainer, {width: '50rem', data});
	}

	private prepareTable(): void {
		this.columns = DbTablesHelper.SortColumns(this.table[0]).filter((c) => c !== 'rowid');
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
