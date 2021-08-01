import {AppState} from '@store/rootReducer';
import {SensorsState} from '@store/sensors/reducer';
import {LoadingStatus, status, StoreModules} from '@entities/store.interfaces';
import {createSelector} from '@ngrx/store';
import {Icon, MappedIcons, MappedSensors, SensorLog} from '@entities/sensors.interfaces';
import {SensorsHelper} from '@shared/helpers/sensors.helper';

export const getState = (state: AppState): SensorsState => state[StoreModules.Sensors];

export namespace SensorsSelectors {
	export const sensors = {
		list: createSelector(getState, (state) => Object.values(state.sensors)),
		map: createSelector(getState, (state): MappedSensors => state.sensors),
		loadingStatus: createSelector(getState, (state) => state.sensorsLoadingStatus),
		lastUpdate: createSelector(getState, (state) => state.lastUpdate),
	};

	export const icons = {
		list: createSelector(getState, (state): Icon[] => state.icons),
		map: createSelector(getState, (state): MappedIcons => SensorsHelper.mapIcons(state.icons)),
	};

	export const sensorDetails = {
		logs: createSelector(getState, (state): SensorLog[] => state.sensorDetails?.logs),
		loadingStatus: createSelector(getState, (state): LoadingStatus => state.sensorDetailsLoadingStatus),
	};

	export const sensorGroups = {
		set: createSelector(getState, (state) => state.groups),
		list: createSelector(getState, (state) => (state?.groups ? [...state.groups] : [])),
		loadingStatus: createSelector(getState, (state) => {
			if (state.groups) {
				return status.loaded;
			}
			return state.sensorsLoadingStatus;
		}),
	};
}
