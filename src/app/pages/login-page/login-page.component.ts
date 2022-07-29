import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {GOOGLE_AUTH_URL} from '@shared/entities/sensors.constants';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
	selector: 'rpi-login-page-component',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
	@Output() authorize = new EventEmitter<string>();

	$googleAuthUrl = GOOGLE_AUTH_URL + '?target=' + window.location.origin + window.location.pathname;

	authForm = new FormGroup({
		login: new FormControl<string>(''),
		password: new FormControl<string>(''),
	});

	public onSubmit(): void {
		const username = this.authForm.controls.login.value;
		const password = this.authForm.controls.password.value;
		const token = btoa(`${username}:${password}`);
		this.authorize.emit(token);
	}
}
