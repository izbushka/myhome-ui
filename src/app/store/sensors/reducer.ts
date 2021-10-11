import {createReducer, on} from '@ngrx/store';
import {Icon, MappedSensors, Sensor, SensorChartPoint, SensorGroup} from '@entities/sensors.interfaces';
import {LoadingStatus, status} from '@entities/store.interfaces';
import {nameOfFactory} from '@entities/nameof.constants';
import {set} from '@shared/helpers/store/immutable.helper';
import {SensorsActions} from '@store/sensors/actions';
import {getApiActionReducers} from '@shared/helpers/store/reducers.helper';

export interface SensorsState {
	sensors: MappedSensors;
	sensorsLoadingStatus: LoadingStatus;
	sensorDetails: Sensor;
	sensorDetailsLoadingStatus: LoadingStatus;
	sensorChart: SensorChartPoint[];
	sensorChartLoadingStatus: LoadingStatus;
	lastUpdate: number;
	icons: Icon[];
	groups: Set<SensorGroup>;
	localSearch: string;
}

export const initialSensorsState: SensorsState = {
	sensors: null,
	sensorsLoadingStatus: status.default,
	sensorDetails: null,
	sensorDetailsLoadingStatus: null,
	sensorChart: null,
	sensorChartLoadingStatus: null,
	lastUpdate: 0,
	icons: null,
	groups: null,
	localSearch: '',
};

export const props = nameOfFactory<SensorsState>();
const apiActionsReducers = getApiActionReducers<SensorsState>();
// const apiActionsReducersWithoutPayload = getApiActionReducersWithoutPayload<SensorsState>();

export const sensorsReducer = createReducer(
	initialSensorsState,
	on(SensorsActions.resetState, () => initialSensorsState),
	// icons
	on(SensorsActions.getIcons.succeeded, (state, {payload}) => set(props('icons'), payload, state)),
	// sensor details
	...apiActionsReducers(SensorsActions.getSensorDetails, 'sensorDetails'),
	// sensor chart
	...apiActionsReducers(SensorsActions.getSensorChart, 'sensorChart'),
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
	on(SensorsActions.localSearch, (state, {text}) => set(props('localSearch'), text, state)),
	// groups
	on(SensorsActions.setSensorGroups, (state, {payload}) => set(props('groups'), payload, state))
);
