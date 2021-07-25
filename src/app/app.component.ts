import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDrawerMode} from '@angular/material/sidenav';

@Component({
	selector: 'rpi-root-component',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	title = 'Replace my with sensor title';
	isSideBarOpened = false;

	public ngOnInit(): void {
		this.isSideBarOpened = this.slideMode() === 'side';
	}

	public slideMode(): MatDrawerMode {
		const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		return width > 1200 ? 'side' : 'over';
	}

	public toggleSideBar(): void {
		this.isSideBarOpened = !this.isSideBarOpened;
	}
}
