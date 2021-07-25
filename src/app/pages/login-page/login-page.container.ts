import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'rpi-login-page',
	template: '<rpi-login-page-component></rpi-login-page-component>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageContainer {}
