import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MappedSensors, SensorGroup} from '@entities/sensors.interfaces';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {RouterActions} from '@store/router/actions';
import {Pages} from '@entities/common.interfaces';

@Component({
	selector: 'rpi-group-card',
	template: `
		<rpi-group-card-component
			[sensors]="sensors"
			[sensorGroup]="sensorGroup"
			(goToGroup)="goToGroup()"
		></rpi-group-card-component>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCardContainer {
	@Input() sensorGroup: SensorGroup;
	@Input() sensors: MappedSensors;

	constructor(private store: Store<AppState>) {}

	goToGroup(): void {
		this.store.dispatch(RouterActions.go({url: [Pages.Sensors, this.sensorGroup.name]}));
	}
}
