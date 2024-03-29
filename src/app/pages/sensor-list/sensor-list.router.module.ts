import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SensorListContainer} from '@pages/sensor-list/sensor-list.container';
import {PageParams} from '@entities/common.interfaces';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: SensorListContainer,
			},
			{
				path: `:${PageParams.GroupId}`,
				component: SensorListContainer,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SensorListRouterModule {}
