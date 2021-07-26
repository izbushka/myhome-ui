import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRouterModule} from './dashboard.router.module';
import {DashboardContainer} from './dashboard.container';
import {GroupCardComponent} from './group-card/group-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
	declarations: [DashboardComponent, DashboardContainer, GroupCardComponent],
	exports: [DashboardContainer],
	imports: [CommonModule, DashboardRouterModule, MatCardModule, MatIconModule, MatProgressSpinnerModule],
})
export class DashboardModule {}
