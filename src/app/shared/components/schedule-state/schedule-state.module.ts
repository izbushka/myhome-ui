import {NgModule} from '@angular/core';
import {ScheduleStateComponent} from './schedule-state.component';
import {ScheduleStateContainer} from '@shared/components/schedule-state/schedule-state.container';
import {SharedModule} from '@shared/shared.module';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {ListOfSchedulesModule} from '@shared/components/list-of-schedules/list-of-schedules.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ScheduleDatePickerModule} from '@shared/components/schedule-date-picker/schedule-date-picker.module';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
	declarations: [ScheduleStateComponent, ScheduleStateContainer],
	imports: [
		SharedModule,
		CommonModule,
		MatDialogModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatSlideToggleModule,
		MatSliderModule,
		ListOfSchedulesModule,
		MatSnackBarModule,
		ScheduleDatePickerModule,
		MatSelectModule,
	],
	exports: [ScheduleStateContainer],
})
export class ScheduleStateModule {}
