import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'rpi-spinner',
	template: '<rpi-spinner-component></rpi-spinner-component>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerContainer {}
