import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {SensorsActions} from '@store/sensors/actions';
import {SensorsSelectors} from '@store/sensors/selectors';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsApiService} from '@api/sensors.api.service';
import {of} from 'rxjs';
import {SensorsHelper} from '@shared/helpers/sensors.helper';

@Injectable()
export class SensorsEffects {
	getSensors$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getSensors.requested),
			withLatestFrom(this.store.select(SensorsSelectors.sensors.lastUpdate)),
			switchMap(([, lastUpdate]) =>
				this.sensorsApiService.getSensors(lastUpdate).pipe(
					concatMap((payload) => {
						const actions = [];
						actions.push(SensorsActions.getSensors.succeeded({payload}));
						if (!lastUpdate) {
							actions.push(
								SensorsActions.setSensorGroups({
									payload: SensorsHelper.getSensorGroups(payload.sensors),
								})
							);
						}
						return actions;
					}),
					catchError((error: string) => of(SensorsActions.getSensors.failed({error: `${error}`})))
				)
			)
		)
	);

	public constructor(
		private actions$: Actions,
		private store: Store<AppState>,
		private sensorsApiService: SensorsApiService
	) {}
}
