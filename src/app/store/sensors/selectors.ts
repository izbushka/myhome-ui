import {AppState} from '@store/rootReducer';
import {SensorsState} from '@store/sensors/reducer';
import {status, StoreModules} from '@entities/store.interfaces';
import {createSelector} from '@ngrx/store';
import {MappedIcons, Sensor, SensorLog, SensorState} from '@entities/sensors.interfaces';
import {SensorsHelper} from '@shared/helpers/sensors.helper';
import {createStateSelector} from '@shared/helpers/store/selectors.helper';

const getState = (state: AppState): SensorsState => state[StoreModules.Sensors];
// const selector = createSelectorForGivenModule(getState);

const getSwitchedOnSensors = (state: SensorsState): Sensor['id'][] => {
	const sensors: Sensor[] = state?.sensors ? Object.values(state.sensors) : [];
	return sensors
		.filter((sensor: Sensor) => !sensor.readonly && sensor.sensorState !== SensorState.Off)
		.sort((a, b) => {
			if (a.group === b.group) {
				return a.name.localeCompare(b.name);
			}
			return a.group.localeCompare(b.group);
		})
		.map((sensor) => sensor.id);
};

export namespace SensorsSelectors {
	export const sensors = {
		list: createSelector(getState, (state) => (state?.sensors ? Object.values(state.sensors) : [])),
		map: createStateSelector(getState, 'sensors'),
		loadingStatus: createStateSelector(getState, 'sensorsLoadingStatus'),
		lastUpdate: createStateSelector(getState, 'lastUpdate'),
		switchedOn: createSelector(getState, getSwitchedOnSensors),
	};

	export const icons = {
		list: createStateSelector(getState, 'icons'),
		map: createSelector(getState, (state): MappedIcons => SensorsHelper.mapIcons(state.icons)),
	};

	export const localSearch = createStateSelector(getState, 'localSearch');
	export const favourites = createStateSelector(getState, 'favourites');

	export const sensorDetails = {
		logs: createSelector(getState, (state): SensorLog[] => state.sensorDetails?.logs),
		loadingStatus: createStateSelector(getState, 'sensorDetailsLoadingStatus'),
		chart: createStateSelector(getState, 'sensorChart'),
		chartLoadingStatus: createStateSelector(getState, 'sensorChartLoadingStatus'),
	};

	export const sensorGroups = {
		set: createStateSelector(getState, 'groups'),
		list: createSelector(getState, (state) => (state?.groups ? [...state.groups] : [])),
		loadingStatus: createSelector(getState, (state) => {
			if (state.groups) {
				return status.loaded;
			}
			return state.sensorsLoadingStatus;
		}),
	};
}
