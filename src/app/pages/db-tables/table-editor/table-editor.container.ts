import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {DbTables, GeneralTableData, TableEditorPayload} from '@shared/entities/administration.interfaces';
import {DbTablesActions} from '@store/db-tables/actions';
import {DbTablesSelectors} from '@store/db-tables/selectors';
import {AppState} from '@store/rootReducer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
	selector: 'rpi-table-editor',
	template: `
		<rpi-table-editor-component
			[row]="table.data"
			[sensors]="sensors$ | async"
			[actions]="actions$ | async"
			[commands]="commands$ | async"
			(closed)="onClosed($event)"
		>
		</rpi-table-editor-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableEditorContainer implements OnInit {
	sensors$: Observable<GeneralTableData[]>;
	actions$: Observable<GeneralTableData[]>;
	commands$: Observable<GeneralTableData[]>;

	constructor(
		public dialogRef: MatDialogRef<TableEditorContainer>,
		@Inject(MAT_DIALOG_DATA) public table: TableEditorPayload,
		private store: Store<AppState>
	) {
		this.sensors$ = this.store.select(DbTablesSelectors.tables).pipe(map((tables) => tables[DbTables.Sensors]));
		this.actions$ = this.store.select(DbTablesSelectors.tables).pipe(map((tables) => tables[DbTables.Actions]));
		this.commands$ = this.store.select(DbTablesSelectors.tables).pipe(map((tables) => tables[DbTables.Commands]));
	}

	public ngOnInit(): void {
		this.store.dispatch(DbTablesActions.getTable.requested({table: DbTables.Sensors}));
		this.store.dispatch(DbTablesActions.getTable.requested({table: DbTables.Actions}));
		this.store.dispatch(DbTablesActions.getTable.requested({table: DbTables.Commands}));
	}

	public onClosed(data: GeneralTableData): void {
		if (data) {
			this.store.dispatch(DbTablesActions.saveTableRow.requested({table: this.table.name, data}));
		}
		this.dialogRef.close();
	}
}
