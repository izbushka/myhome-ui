import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {CommonActions} from '@store/common/actions';
import {CommonSelectors} from '@store/common/selectors';
import {AppState} from '@store/rootReducer';
import {Store} from '@ngrx/store';
import {RouterActions} from '@store/router/actions';

@Component({
	selector: 'rpi-top-panel',
	template: `
		<rpi-top-panel-component
			[isSideBarOpened]="leftMenuOpened$ | async"
			(setLeftPanelState)="setLeftPanelState($event)"
			(go)="go($event)"
		></rpi-top-panel-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPanelContainer {
	readonly leftMenuOpened$: Observable<boolean>;

	constructor(private store: Store<AppState>) {
		this.leftMenuOpened$ = this.store.select(CommonSelectors.isLeftPanelOpen);
	}

	public setLeftPanelState(state: boolean): void {
		this.store.dispatch(CommonActions.openLeftPanel({isOpen: state}));
	}

	public go(page: string | string[]): void {
		this.store.dispatch(RouterActions.go({url: page}));
	}
}
