import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DbTablesComponent} from './db-tables.component';
import {DbTablesContainer} from './db-tables.container';
import {DbTablesRouterModule} from '@pages/db-tables/db-tables.router.module';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {SpinnerModule} from '@shared/components/spinner/spinner.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';

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
	],
	exports: [DbTablesContainer],
})
export class DbTablesModule {}
