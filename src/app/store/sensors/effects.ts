import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
	catchError,
	concatMap,
	concatMapTo,
	debounce,
	debounceTime,
	filter,
	map,
	mapTo,
	startWith,
	switchMap,
	switchMapTo,
	take,
	takeUntil,
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
import {RouterSelectors} from '@store/router/selectors';
import {PageParams, Pages} from '@entities/common.interfaces';
import {mapApiActions} from '@shared/helpers/store/effects.helper';
import {ErrorPayload} from '../../shared/helpers/store/actions.helper';

@Injectable()
export class SensorsEffects {
	pollingFilter$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getSensors.succeeded),
			filter(() => document.hidden),
			mapTo(SensorsActions.polling.stopByVisibility())
		)
	);

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
					mapTo(SensorsActions.getSensors.requested()),
					takeUntil(
						this.actions$.pipe(
							ofType(SensorsActions.polling.stop, SensorsActions.polling.stopByVisibility),
							take(1)
						)
					)
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
			switchMap(() => this.sensorsApiService.getIcons().pipe(mapApiActions(SensorsActions.getIcons)))
		)
	);

	setSchedule$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.addSchedule.requested),
			switchMap(({payload}) =>
				this.sensorsApiService.addSchedule(payload).pipe(mapApiActions(SensorsActions.addSchedule))
			)
		)
	);

	deleteSchedule$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.deleteSchedule.requested),
			switchMap(({scheduleId}) =>
				this.sensorsApiService.deleteSchedule(scheduleId).pipe(mapApiActions(SensorsActions.deleteSchedule))
			)
		)
	);

	getSchedule$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getSchedules.requested),
			switchMap(() => this.sensorsApiService.getSchedules().pipe(mapApiActions(SensorsActions.getSchedules)))
		)
	);

	getFavourites$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getFavourites.requested),
			withLatestFrom(this.store.select(SensorsSelectors.favourites)),
			filter(([, favourites]) => favourites.length === 0),
			switchMap(() => this.sensorsApiService.getFavourites().pipe(mapApiActions(SensorsActions.getFavourites)))
		)
	);

	toggleFavourites$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.toggleFavourites.requested),
			switchMap(({id}) =>
				this.sensorsApiService.toggleFavourites(id).pipe(
					map((payload) => SensorsActions.getFavourites.succeeded({payload})),
					catchError((error: ErrorPayload) => of(SensorsActions.toggleFavourites.failed(error)))
				)
			)
		)
	);

	getSensorDetails$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getSensorDetails.requested),
			withLatestFrom(this.store.select(RouterSelectors.selectRouteParam(PageParams.SensorId))),
			switchMap(([, sensorId]) =>
				this.sensorsApiService.getSensorDetails(+sensorId).pipe(
					map((payload) => SensorsActions.getSensorDetails.succeeded({payload})),
					catchError((error: string) => of(SensorsActions.getSensorDetails.failed({error: `${error}`})))
				)
			)
		)
	);

	getSensorChart = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getSensorChart.requested),
			withLatestFrom(this.store.select(RouterSelectors.selectRouteParam(PageParams.SensorId))),
			switchMap(([{period}, sensorId]) =>
				this.sensorsApiService.getSensorChart(+sensorId, period).pipe(
					map((payload) => SensorsActions.getSensorChart.succeeded({payload})),
					catchError((error: string) => of(SensorsActions.getSensorChart.failed({error: `${error}`})))
				)
			)
		)
	);

	switchSensor$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.switchSensor.requested),
			switchMap(({sensorId, state}) =>
				this.sensorsApiService.setSensorState(sensorId, state).pipe(
					mapTo(SensorsActions.switchSensor.succeeded()),
					catchError((error: string) => of(SensorsActions.switchSensor.failed({error: `${error}`})))
				)
			)
		)
	);

	// in case of offline mode, to get cached sensors
	getSensorsWithoutUpdateTime$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getSensors.failed),
			withLatestFrom(this.store.select(SensorsSelectors.sensors.lastUpdate)),
			filter(([, lastUpdate]) => !!lastUpdate),
			concatMapTo([
				SensorsActions.getSensors.setTimestamp({payload: null}),
				SensorsActions.getSensors.requested(),
			])
		)
	);

	updateSensorDetails$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getSensors.succeeded),
			withLatestFrom(
				this.store.select(RouterSelectors.selectRouteParam(PageParams.SensorId)),
				this.store.select(RouterSelectors.url)
			),
			filter(
				([{payload}, sensorId, url]) =>
					`${Pages.SensorDetails}/${sensorId}` === `${url}` &&
					payload.some((sensor) => sensor.id === +sensorId)
			),
			mapTo(SensorsActions.getSensorDetails.requested())
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
							SensorsActions.getSensors.succeeded({payload: payload.sensors}),
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

	constructor(
		private actions$: Actions,
		private store: Store<AppState>,
		private sensorsApiService: SensorsApiService
	) {}
}
