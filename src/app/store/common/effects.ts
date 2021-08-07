import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, filter, map, mapTo, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {CommonActions} from '@store/common/actions';
import {LeftPanelModes, StorageKeys} from '@entities/common.interfaces';
import {RouterActions} from '@store/router/actions';
import {CommonSelectors} from '@store/common/selectors';
import {DataStorageService, StorageTypes} from '@shared/services/data-storage.service';
import {AuthActions} from '@store/auth/actions';
import {SensorsActions} from '@store/sensors/actions';

@Injectable()
export class CommonEffects {
	setPanelMode$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CommonActions.setLeftPanelMode),
			map(({mode}) => CommonActions.openLeftPanel({isOpen: mode === LeftPanelModes.Side}))
		)
	);

	openCloneMenu$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RouterActions.go),
			withLatestFrom(this.store.select(CommonSelectors.leftPanelMode)),
			filter(([, panelMode]) => panelMode === LeftPanelModes.Over),
			mapTo(CommonActions.openLeftPanel({isOpen: false}))
		)
	);

	appInit$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CommonActions.appInit),
			concatMap(() => {
				const token = this.storage.get<string>(StorageTypes.Local, StorageKeys.Token);
				return [AuthActions.setToken({payload: token}), SensorsActions.polling.start()];
			})
		)
	);

	constructor(private actions$: Actions, private store: Store<AppState>, private storage: DataStorageService) {}
}
