import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SensorListComponent} from './sensor-list.component';
import {SensorListContainer} from './sensor-list.container';
import {SensorListRouterModule} from '@pages/sensor-list/sensor-list.router.module';
import {GroupCardModule} from '@shared/components/group-card/group-card.module';
import {SpinnerModule} from '@shared/components/spinner/spinner.module';

@NgModule({
	declarations: [SensorListComponent, SensorListContainer],
	imports: [CommonModule, SensorListRouterModule, GroupCardModule, SpinnerModule],
	exports: [SensorListContainer],
})
export class SensorListModule {}
