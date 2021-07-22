import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'rpi-root',
	template: '<rpi-root-component></rpi-root-component>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContainer {}
