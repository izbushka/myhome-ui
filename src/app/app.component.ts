import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatDrawerMode} from '@angular/material/sidenav';
import {LeftPanelModes} from '@entities/common.interfaces';

@Component({
	selector: 'rpi-root-component',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	@Input() isSideBarOpened: boolean;
	@Input() sideBarMode: MatDrawerMode = LeftPanelModes.Over;
}
