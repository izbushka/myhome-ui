import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DbTablesContainer} from '@pages/db-tables/db-tables.container';
import {PageParams} from '@entities/common.interfaces';
import {DbTables} from '@entities/administration.interfaces';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: `:${PageParams.Table}`,
				component: DbTablesContainer,
			},
			{
				path: '**',
				redirectTo: DbTables.SensorsActionsCombined,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DbTablesRouterModule {}
