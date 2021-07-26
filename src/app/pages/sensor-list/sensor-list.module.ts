import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SensorListComponent} from './sensor-list.component';
import {SensorListContainer} from './sensor-list.container';
import {SensorListRouterModule} from '@pages/sensor-list/sensor-list.router.module';

@NgModule({
	declarations: [SensorListComponent, SensorListContainer],
	imports: [CommonModule, SensorListRouterModule],
	exports: [SensorListContainer],
})
export class SensorListModule {}
