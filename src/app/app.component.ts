import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'rpi-root-component',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	title = 'Home Controll Center';
}
