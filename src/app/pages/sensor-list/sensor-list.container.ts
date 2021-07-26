import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {SensorsSelectors} from '@store/sensors/selectors';

@Component({
	selector: 'rpi-sensor-list',
	template: '<rpi-sensor-list-component></rpi-sensor-list-component>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorListContainer implements OnInit {
	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.select(SensorsSelectors.sensorGroups.list);
		this.store.select(SensorsSelectors.sensors.map);
	}
}
