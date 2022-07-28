import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeftMenuComponent} from './left-menu.component';
import {LeftMenuContainer} from './left-menu.container';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {ListOfSchedulesModule} from '@shared/components/list-of-schedules/list-of-schedules.module';
import {MatDialogModule} from '@angular/material/dialog';
import {ScheduleStateModule} from '@shared/components/schedule-state/schedule-state.module';

@NgModule({
	declarations: [LeftMenuComponent, LeftMenuContainer],
	imports: [
		CommonModule,
		MatListModule,
		RouterModule,
		MatIconModule,
		ListOfSchedulesModule,
		MatDialogModule,
		ScheduleStateModule,
	],
	exports: [LeftMenuContainer],
})
export class LeftMenuModule {}
