import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {Pages} from '@shared/entities/common.interfaces';
import {AuthGuard} from '@shared/guards/auth.guard';

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
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true, preloadingStrategy: PreloadAllModules})],
	exports: [RouterModule],
})
export class AppRoutingModule {}
