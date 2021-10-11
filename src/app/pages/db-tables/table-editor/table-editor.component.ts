import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {GeneralTableData} from '@shared/entities/administration.interfaces';
import {NgChanges} from '@shared/entities/ng-changes.types';
import {DbTablesHelper} from '@shared/helpers/db-tables/db-tables.helper';

@UntilDestroy()
@Component({
	selector: 'rpi-table-editor-component',
	templateUrl: './table-editor.component.html',
	styleUrls: ['./table-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableEditorComponent implements OnChanges {
	@Input() row: GeneralTableData;
	@Input() sensors: GeneralTableData[];
	@Input() actions: GeneralTableData[];
	@Input() commands: GeneralTableData[];

	@Output() closed = new EventEmitter<GeneralTableData>();

	columns: (keyof GeneralTableData)[];
	selectors: Record<string, GeneralTableData[]> = {};
	form: FormGroup;

	public ngOnChanges(changes: NgChanges<TableEditorComponent>): void {
		if (changes.row) {
			this.prepareColumns();
		}
		if (changes.sensors) {
			this.selectors.sensor_id = this.sensors;
		}
		if (changes.actions) {
			this.selectors.action_id = this.actions;
		}
		if (changes.commands) {
			this.selectors.cmd_id = this.commands;
		}
	}

	public onSubmit(): void {
		this.closed.emit(this.form.value);
	}

	private prepareColumns(): void {
		this.columns = DbTablesHelper.SortColumns(this.row);
		this.prepareForm();
	}

	private prepareForm(): void {
		this.form = new FormGroup(
			this.columns.reduce((acc, col) => {
				acc[col] = new FormControl(this.row[col]);
				return acc;
			}, {} as Record<string, FormControl>)
		);

		this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((val) => {
			// to set multiple inputs with the same formControl
			const data: GeneralTableData = val;

			if ('action_id' in val) {
				data.action_id = +this.form.controls.action_id.value;
				if (!data.action_id) {
					data.action_id = null;
				}
			}
			if ('sensor_id' in val) {
				data.sensor_id = +this.form.controls.sensor_id.value;
				if (!data.sensor_id) {
					data.sensor_id = null;
				}
			}
			this.form.patchValue(data, {onlySelf: true, emitEvent: false});
		});
	}
}
