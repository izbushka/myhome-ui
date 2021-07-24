import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRouterModule} from './dashboard.router.module';
import {DashboardContainer} from './dashboard.container';

@NgModule({
	declarations: [DashboardComponent, DashboardContainer],
	exports: [DashboardContainer],
	imports: [CommonModule, DashboardRouterModule],
})
export class DashboardModule {}
