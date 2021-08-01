import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Sensor, SensorChartPoint, SensorLog} from '@entities/sensors.interfaces';
import {LoadingStatus} from '@entities/store.interfaces';
import {Period} from '@entities/common.interfaces';
import {Chart} from 'angular-highcharts';
import {NgChanges} from '@entities/ng-changes.types';
import {take} from 'rxjs/operators';
import {Highcharts} from 'highcharts/modules/data';
import {SENSORS_CHART_OPTIONS} from '@entities/sensors.constants';

@Component({
	selector: 'rpi-sensor-details-component',
	templateUrl: './sensor-details.component.html',
	styleUrls: ['./sensor-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorDetailsComponent implements OnChanges {
	@Input() sensor: Sensor;
	@Input() logs: SensorLog[];
	@Input() loadingStatus: LoadingStatus;
	@Input() sensorChart: SensorChartPoint[];
	@Input() chartLoadingStatus: LoadingStatus;

	@Output() updateChart = new EventEmitter<Period>();

	readonly periods = Period;
	readonly displayedColumns: string[] = ['change_time', 'state'];
	selectedPeriod = Period.Day;

	chart = new Chart(SENSORS_CHART_OPTIONS);

	public setPeriod(period: Period): void {
		this.updateChart.emit(period);
		this.selectedPeriod = period;
	}

	public ngOnChanges(changes: NgChanges<SensorDetailsComponent>): void {
		if (changes.sensorChart) {
			this.prepareChart();
		}
	}

	private prepareChart(): void {
		// eslint-disable @typescript-eslint/no-unsafe-member-access
		this.chart?.ref$.pipe(take(1)).subscribe((chart: Highcharts.Chart) => {
			if (this.sensorChart) {
				chart.zoomOut();
				chart.update({series: []}, false, true);
			}
			const chartData = this.sensorChart.map((item) => [
				new Date(`${item.date} ${item.time}`).getTime(),
				item.value,
			]);

			const series = {
				type: 'area',
				name: 'te',
				data: chartData,
			};
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			chart.update({series}, true, true);
		});
		// eslint-enable
	}
}
