import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PageParams, Pages} from '@shared/entities/common.interfaces';
import {AuthGuard} from '@shared/guards/auth.guard';
import {ROUTING_USE_HASH} from '@entities/common.constants';

const routes: Routes = [
	{
		path: Pages.Login,
		loadChildren: () => import('@pages/login-page/login-page.module').then((m) => m.LoginPageModule),
	},
	{
		path: Pages.Dashboard,
		loadChildren: () => import('@pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
		canActivate: [AuthGuard],
	},
	{
		path: Pages.Sensors,
		loadChildren: () => import('@pages/sensor-list/sensor-list.module').then((m) => m.SensorListModule),
		canActivate: [AuthGuard],
	},
	{
		path: `${Pages.SensorDetails}/:${PageParams.SensorId}`,
		loadChildren: () => import('@pages/sensor-details/sensor-details.module').then((m) => m.SensorDetailsModule),
		canActivate: [AuthGuard],
	},
	{
		path: `${Pages.DbTables}`,
		loadChildren: () => import('@pages/db-tables/db-tables.module').then((m) => m.DbTablesModule),
		canActivate: [AuthGuard],
	},
	{
		path: '**',
		redirectTo: Pages.Dashboard,
	},
];

@NgModule({
	// imports: [RouterModule.forRoot(routes)],
	imports: [RouterModule.forRoot(routes, {useHash: ROUTING_USE_HASH, preloadingStrategy: PreloadAllModules})],
	exports: [RouterModule],
})
export class AppRoutingModule {}
