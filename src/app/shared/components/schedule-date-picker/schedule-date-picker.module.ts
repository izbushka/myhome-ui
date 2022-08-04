import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleDatePickerComponent} from './schedule-date-picker.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
	declarations: [ScheduleDatePickerComponent],
	imports: [CommonModule, MatFormFieldModule, MatSliderModule, MatInputModule, ReactiveFormsModule],
	exports: [ScheduleDatePickerComponent],
})
export class ScheduleDatePickerModule {}
