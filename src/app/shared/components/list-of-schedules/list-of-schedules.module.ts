import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListOfSchedulesComponent} from './list-of-schedules.component';
import {ListOfSchedulesContainer} from '@shared/components/list-of-schedules/list-of-schedules.container';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
	declarations: [ListOfSchedulesComponent, ListOfSchedulesContainer],
	exports: [ListOfSchedulesContainer],
	imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule, MatTooltipModule],
})
export class ListOfSchedulesModule {}
