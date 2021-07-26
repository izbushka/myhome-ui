import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, debounce, mapTo, startWith, switchMap, withLatestFrom} from 'rxjs/operators';
import {SensorsActions} from '@store/sensors/actions';
import {SensorsSelectors} from '@store/sensors/selectors';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsApiService} from '@api/sensors.api.service';
import {of, timer} from 'rxjs';
import {SensorsHelper} from '@shared/helpers/sensors.helper';
import {SENSORS_POLLING_INTERVAL} from '@entities/common.constants';

@Injectable()
export class SensorsEffects {
	polling$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.polling.start),
			switchMap(() =>
				this.actions$.pipe(
					startWith(SensorsActions.polling.start),
					ofType(
						SensorsActions.polling.start,
						SensorsActions.getSensors.failed,
						SensorsActions.getSensors.succeeded
					),
					debounce((action) =>
						timer(action.type === SensorsActions.polling.start.type ? 1 : SENSORS_POLLING_INTERVAL)
					),
					mapTo(SensorsActions.getSensors.requested())
				)
			)
		)
	);

	getSensors$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getSensors.requested),
			withLatestFrom(
				this.store.select(SensorsSelectors.sensors.lastUpdate),
				this.store.select(SensorsSelectors.sensors.map)
			),
			switchMap(([, lastUpdate, curSensors]) =>
				this.sensorsApiService.getSensors(lastUpdate).pipe(
					concatMap((payload) => {
						const actions = [];
						actions.push(
							SensorsActions.getSensors.succeeded(),
							SensorsActions.getSensors.setTimestamp({
								payload: payload.timestamp,
							})
						);
						if (!lastUpdate) {
							actions.push(
								SensorsActions.setSensorGroups({
									payload: SensorsHelper.getSensorGroups(payload.sensors),
								})
							);
						}
						if (payload?.sensors?.length) {
							actions.push(
								SensorsActions.getSensors.update({
									payload: SensorsHelper.updateSensors(curSensors, payload.sensors),
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
