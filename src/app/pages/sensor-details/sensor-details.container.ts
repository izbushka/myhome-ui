import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsActions} from '@store/sensors/actions';
import {combineLatest, Observable} from 'rxjs';
import {Sensor, SensorChartPoint, SensorLog} from '@entities/sensors.interfaces';
import {SensorsSelectors} from '@store/sensors/selectors';
import {map} from 'rxjs/operators';
import {RouterSelectors} from '@store/router/selectors';
import {PageParams, Period} from '@entities/common.interfaces';
import {LoadingStatus} from '@entities/store.interfaces';

@Component({
	selector: 'rpi-sensor-details',
	template: `
		<rpi-sensor-details-component
			[sensor]="sensor$ | async"
			[logs]="sensorLogs$ | async"
			[loadingStatus]="loadingStatus$ | async"
			[sensorChart]="chart$ | async"
			[isFavourite]="isFavourite$ | async"
			[chartLoadingStatus]="chartLoadingStatus$ | async"
			(updateChart)="updateChart($event)"
		></rpi-sensor-details-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorDetailsContainer implements OnInit {
	sensor$: Observable<Sensor>;
	isFavourite$: Observable<boolean>;
	sensorLogs$: Observable<SensorLog[]>;
	loadingStatus$: Observable<LoadingStatus>;
	chart$: Observable<SensorChartPoint[]>;
	chartLoadingStatus$: Observable<LoadingStatus>;

	constructor(private store: Store<AppState>) {
		this.sensor$ = combineLatest([
			this.store.select(SensorsSelectors.sensors.map),
			this.store.select(RouterSelectors.selectRouteParam(PageParams.SensorId)),
		]).pipe(map(([sensors, sensorId]) => sensors?.[+sensorId]));

		this.isFavourite$ = combineLatest([
			this.store.select(SensorsSelectors.favourites),
			this.store.select(RouterSelectors.selectRouteParam(PageParams.SensorId)),
		]).pipe(map(([favourites, sensorId]) => favourites.includes(+sensorId)));

		this.sensorLogs$ = this.store.select(SensorsSelectors.sensorDetails.logs);
		this.loadingStatus$ = this.store.select(SensorsSelectors.sensorDetails.loadingStatus);
		this.chart$ = this.store.select(SensorsSelectors.sensorDetails.chart);
		this.chartLoadingStatus$ = this.store.select(SensorsSelectors.sensorDetails.chartLoadingStatus);
	}

	public ngOnInit(): void {
		this.store.dispatch(SensorsActions.getSensorDetails.requested());
		this.updateChart(Period.Day);
	}

	public updateChart(period: Period): void {
		this.store.dispatch(SensorsActions.getSensorChart.requested({period}));
	}
}
