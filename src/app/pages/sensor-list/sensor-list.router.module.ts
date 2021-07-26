import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SensorListContainer} from '@pages/sensor-list/sensor-list.container';

const routes: Routes = [
	{
		path: '',
		component: SensorListContainer,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SensorListRouterModule {}
