import {createReducer, on} from '@ngrx/store';
import {Sensor} from '@entities/sensors.interfaces';
import {LoadingStatus, status} from '@entities/store.interfaces';
import {nameOfFactory} from '@entities/nameof.constants';
import {flow, set} from '@shared/helpers/store/immutable.helper';
import {SensorsActions} from '@store/sensors/actions';

export interface SensorsState {
	sensors: Sensor[];
	sensorsLoadingStatus: LoadingStatus;
	lastUpdate: number;
}

export const initialSensorsState: SensorsState = {
	sensors: null,
	lastUpdate: 0,
	sensorsLoadingStatus: status.default,
};

export const props = nameOfFactory<SensorsState>();

export const sensorsReducer = createReducer(
	initialSensorsState,
	on(SensorsActions.getSensors.requested, (state) => set(props('sensorsLoadingStatus'), status.loading, state)),
	on(SensorsActions.getSensors.succeeded, (state, {payload}) =>
		flow(state)(
			set(props('sensorsLoadingStatus'), status.loading),
			set(props('sensors'), payload.sensors),
			set(props('lastUpdate'), payload.timestamp)
		)
	),
	on(SensorsActions.getSensors.failed, (state, {error}) =>
		set(props('sensorsLoadingStatus'), status.error(error), state)
	)
);
