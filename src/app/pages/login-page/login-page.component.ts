import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'rpi-login-page-component',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
