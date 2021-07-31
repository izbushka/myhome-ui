import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
	catchError,
	concatMap,
	debounce,
	debounceTime,
	map,
	mapTo,
	startWith,
	switchMap,
	switchMapTo,
	withLatestFrom,
} from 'rxjs/operators';
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
			withLatestFrom(this.store.select(SensorsSelectors.icons.list)),
			switchMap(([, icons]) => {
				if (icons) {
					return of(icons);
				}
				this.store.dispatch(SensorsActions.getIcons.requested());
				return this.actions$.pipe(
					ofType(SensorsActions.getIcons.succeeded),
					map(({payload}) => payload)
				);
			}),
			switchMapTo(
				this.actions$.pipe(
					startWith(SensorsActions.polling.start),
					ofType(
						SensorsActions.polling.start,
						SensorsActions.getSensors.failed,
						SensorsActions.getSensors.succeeded,
						SensorsActions.switchSensor.succeeded,
						SensorsActions.switchSensor.failed
					),
					map((action) =>
						[
							SensorsActions.polling.start.type,
							SensorsActions.switchSensor.succeeded.type,
							SensorsActions.switchSensor.failed.type,
						].includes(action.type)
					),
					debounce((noDelay) => timer(noDelay ? 1 : SENSORS_POLLING_INTERVAL)),
					mapTo(SensorsActions.getSensors.requested())
				)
			)
		)
	);

	retryGetIcons$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getIcons.failed),
			debounceTime(SENSORS_POLLING_INTERVAL),
			mapTo(SensorsActions.getIcons.requested())
		)
	);

	getIcons$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getIcons.requested),
			switchMap(() =>
				this.sensorsApiService.getIcons().pipe(
					map((payload) => SensorsActions.getIcons.succeeded({payload})),
					catchError((error: string) => of(SensorsActions.getIcons.failed({error: `${error}`})))
				)
			)
		)
	);

	switchSensor$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.switchSensor.requested),
			switchMap(({sensorId, state}) =>
				this.sensorsApiService.switchSensor(sensorId, state).pipe(
					mapTo(SensorsActions.switchSensor.succeeded()),
					catchError((error: string) => of(SensorsActions.switchSensor.failed({error: `${error}`})))
				)
			)
		)
	);

	getSensors$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getSensors.requested),
			withLatestFrom(
				this.store.select(SensorsSelectors.sensors.lastUpdate),
				this.store.select(SensorsSelectors.sensors.map),
				this.store.select(SensorsSelectors.icons.map)
			),
			switchMap(([, lastUpdate, curSensors, icons]) =>
				this.sensorsApiService.getSensors(icons, lastUpdate).pipe(
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
									payload: SensorsHelper.getSensorGroups(payload.sensors, icons),
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
