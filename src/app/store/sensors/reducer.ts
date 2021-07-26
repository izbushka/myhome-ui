import {createReducer, on} from '@ngrx/store';
import {Sensor, SensorGroup} from '@entities/sensors.interfaces';
import {LoadingStatus, status} from '@entities/store.interfaces';
import {nameOfFactory} from '@entities/nameof.constants';
import {set} from '@shared/helpers/store/immutable.helper';
import {SensorsActions} from '@store/sensors/actions';

export interface SensorsState {
	sensors: Sensor[];
	sensorsLoadingStatus: LoadingStatus;
	lastUpdate: number;
	groups: Set<SensorGroup>;
}

export const initialSensorsState: SensorsState = {
	sensors: null,
	lastUpdate: 0,
	sensorsLoadingStatus: status.default,
	groups: null,
};

export const props = nameOfFactory<SensorsState>();

export const sensorsReducer = createReducer(
	initialSensorsState,
	// sensors
	on(SensorsActions.getSensors.requested, (state) =>
		set(props('sensorsLoadingStatus'), state.sensors ? status.updating : status.loading, state)
	),
	on(SensorsActions.getSensors.succeeded, (state) => set(props('sensorsLoadingStatus'), status.loaded, state)),
	on(SensorsActions.getSensors.failed, (state, {error}) =>
		set(props('sensorsLoadingStatus'), status.error(error), state)
	),
	on(SensorsActions.getSensors.update, (state, {payload}) => set(props('sensors'), payload, state)),
	on(SensorsActions.getSensors.setTimestamp, (state, {payload}) => set(props('lastUpdate'), payload, state)),
	// groups
	on(SensorsActions.setSensorGroups, (state, {payload}) => set(props('groups'), payload, state))
);
