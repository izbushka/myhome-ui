import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {Pages} from '@shared/entities/common.interfaces';

const routes: Routes = [
	{
		path: Pages.Dashboard,
		loadChildren: () => import('@pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true, preloadingStrategy: PreloadAllModules})],
	exports: [RouterModule],
})
export class AppRoutingModule {}
