import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';

@Component({
	selector: 'rpi-schedule-date-picker',
	templateUrl: './schedule-date-picker.component.html',
	styleUrls: ['./schedule-date-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDatePickerComponent {
	@Input() control: FormControl;

	public formatSlider(v: number): string {
		return `${v} min`;
	}

	public addMinutes(minutes: number): void {
		const now = moment();
		this.control.patchValue(now.add(minutes, 'minutes').format('YYYY-MM-DDTkk:mm'));
	}
}
