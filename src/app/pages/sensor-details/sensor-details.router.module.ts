import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SensorDetailsContainer} from '@pages/sensor-details/sensor-details.container';

const routes: Routes = [
	{
		path: '',
		component: SensorDetailsContainer,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SensorDetailsRouterModule {}
