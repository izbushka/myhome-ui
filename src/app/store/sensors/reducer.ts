import {createReducer, on} from '@ngrx/store';
import {Icon, Sensor, SensorGroup} from '@entities/sensors.interfaces';
import {LoadingStatus, status} from '@entities/store.interfaces';
import {nameOfFactory} from '@entities/nameof.constants';
import {flow, set} from '@shared/helpers/store/immutable.helper';
import {SensorsActions} from '@store/sensors/actions';

export interface SensorsState {
	sensors: Sensor[];
	sensorsLoadingStatus: LoadingStatus;
	sensorDetails: Sensor;
	sensorDetailsLoadingStatus: LoadingStatus;
	lastUpdate: number;
	icons: Icon[];
	groups: Set<SensorGroup>;
}

export const initialSensorsState: SensorsState = {
	sensors: null,
	sensorsLoadingStatus: status.default,
	sensorDetails: null,
	sensorDetailsLoadingStatus: null,
	lastUpdate: 0,
	icons: null,
	groups: null,
};

export const props = nameOfFactory<SensorsState>();

export const sensorsReducer = createReducer(
	initialSensorsState,
	// icons
	on(SensorsActions.getIcons.succeeded, (state, {payload}) => set(props('icons'), payload, state)),
	// sensor details
	on(SensorsActions.getSensorDetails.requested, (state) =>
		set(props('sensorDetailsLoadingStatus'), status.loading, state)
	),
	on(SensorsActions.getSensorDetails.succeeded, (state, {payload}) =>
		flow(state)(set(props('sensorDetailsLoadingStatus'), status.loaded), set(props('sensorDetails'), payload))
	),
	on(SensorsActions.getSensorDetails.failed, (state, {error}) =>
		set(props('sensorDetailsLoadingStatus'), status.error(error), state)
	),
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
