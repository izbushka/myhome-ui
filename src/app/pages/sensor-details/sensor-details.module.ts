import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SensorDetailsComponent} from './sensor-details.component';
import {SensorDetailsContainer} from './sensor-details.container';
import {SensorDetailsRouterModule} from '@pages/sensor-details/sensor-details.router.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {SensorCardModule} from '@shared/components/sensor-card/sensor-card.module';
import {ChartModule} from 'angular-highcharts';

@NgModule({
	declarations: [SensorDetailsComponent, SensorDetailsContainer],
	exports: [SensorDetailsContainer],
	imports: [CommonModule, SensorDetailsRouterModule, ChartModule, MatTabsModule, MatTableModule, SensorCardModule],
})
export class SensorDetailsModule {}
