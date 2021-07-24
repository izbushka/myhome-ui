import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardContainer} from '@pages/dashboard/dashboard.container';

const routes: Routes = [
	{
		path: '',
		component: DashboardContainer,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRouterModule {}
