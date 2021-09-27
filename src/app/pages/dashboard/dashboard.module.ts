import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRouterModule} from './dashboard.router.module';
import {DashboardContainer} from './dashboard.container';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {GroupCardModule} from '@shared/components/group-card/group-card.module';
import {SpinnerModule} from '@shared/components/spinner/spinner.module';

@NgModule({
	declarations: [DashboardComponent, DashboardContainer],
	exports: [DashboardContainer],
	imports: [
		CommonModule,
		DashboardRouterModule,
		MatCardModule,
		MatIconModule,
		MatProgressSpinnerModule,
		GroupCardModule,
		SpinnerModule,
	],
})
export class DashboardModule {}
