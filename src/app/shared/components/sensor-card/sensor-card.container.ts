import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Sensor} from '@entities/sensors.interfaces';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {RouterActions} from '@store/router/actions';
import {Pages} from '@entities/common.interfaces';
import {SensorsActions} from '../../../store/sensors/actions';

@Component({
	selector: 'rpi-sensor-card',
	template: `<rpi-sensor-card-component
		[sensor]="sensor"
		[isFavourite]="isFavourite"
		(toDetails)="goToDetails()"
		(toggleFavourites)="toggleFavourites()"
	></rpi-sensor-card-component>`,
	styles: [':host {display: block}'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorCardContainer {
	@Input() sensor: Sensor;
	@Input() isFavourite: boolean;
	@Output() toDetails = new EventEmitter<number>();

	constructor(private store: Store<AppState>) {}

	public goToDetails(): void {
		this.store.dispatch(RouterActions.go({url: [Pages.SensorDetails, this.sensor.id]}));
	}

	public toggleFavourites(): void {
		this.store.dispatch(SensorsActions.toggleFavourites.requested({id: this.sensor.id}));
	}
}
