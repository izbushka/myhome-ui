import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GOOGLE_AUTH_URL} from '@shared/entities/sensors.constants';

@Component({
	selector: 'rpi-login-page-component',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
	@Output() authorize = new EventEmitter<string>();

	$googleAuthUrl = GOOGLE_AUTH_URL + '&state=' + window.location.origin + window.location.pathname;

	authForm = new FormGroup({
		login: new FormControl(''),
		password: new FormControl(''),
	});

	public onSubmit(): void {
		const username = this.authForm.controls.login.value as string;
		const password = this.authForm.controls.password.value as string;
		const token = btoa(`${username}:${password}`);
		this.authorize.emit(token);
	}
}
