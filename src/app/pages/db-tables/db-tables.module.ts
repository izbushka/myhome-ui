import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {DbTablesRouterModule} from '@pages/db-tables/db-tables.router.module';
import {SpinnerModule} from '@shared/components/spinner/spinner.module';
import {DbTablesComponent} from './db-tables.component';
import {DbTablesContainer} from './db-tables.container';
import {TableEditorModule} from './table-editor/tables-editor.module';

@NgModule({
	declarations: [DbTablesComponent, DbTablesContainer],
	imports: [
		CommonModule,
		DbTablesRouterModule,
		MatTableModule,
		MatTabsModule,
		SpinnerModule,
		MatFormFieldModule,
		MatInputModule,
		MatRadioModule,
		MatDialogModule,
		MatButtonModule,
		TableEditorModule,
	],
	exports: [DbTablesContainer],
})
export class DbTablesModule {}
