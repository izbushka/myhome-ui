import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {CommonActions} from '@store/common/actions';
import {CommonSelectors} from '@store/common/selectors';
import {AppState} from '@store/rootReducer';
import {Store} from '@ngrx/store';
import {RouterActions} from '@store/router/actions';
import {SensorsSelectors} from '@store/sensors/selectors';
import {map, throttleTime} from 'rxjs/operators';
import {SensorsActions} from '@store/sensors/actions';
import {Pages} from '@shared/entities/common.interfaces';
import {RouterSelectors} from '@store/router/selectors';

@Component({
	selector: 'rpi-top-panel',
	template: `
		<rpi-top-panel-component
			[isSideBarOpened]="leftMenuOpened$ | async"
			[lastUpdate]="lastUpdate$ | async"
			[curPage]="curPage$ | async"
			(setLeftPanelState)="setLeftPanelState($event)"
			(go)="go($event)"
			(doSearch)="doSearch($event)"
		></rpi-top-panel-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPanelContainer {
	readonly leftMenuOpened$: Observable<boolean>;
	readonly lastUpdate$: Observable<number>;
	readonly curPage$: Observable<Pages>;

	constructor(private store: Store<AppState>) {
		this.leftMenuOpened$ = this.store.select(CommonSelectors.isLeftPanelOpen);
		this.lastUpdate$ = this.store.select(SensorsSelectors.sensors.lastUpdate).pipe(throttleTime(1000));
		this.curPage$ = this.store.select(RouterSelectors.url).pipe(map((page: string) => page as Pages));
	}

	public setLeftPanelState(state: boolean): void {
		this.store.dispatch(CommonActions.openLeftPanel({isOpen: state}));
	}

	public go(page: string | string[]): void {
		this.store.dispatch(RouterActions.go({url: page}));
	}

	public doSearch(str: string): void {
		this.store.dispatch(SensorsActions.localSearch({text: str}));
	}
}
