import {createAction, props} from '@ngrx/store';
import {StoreModules} from '@entities/store.interfaces';
import {
	Icon,
	MappedSensors,
	ScheduledState,
	Sensor,
	SensorFullState,
	SensorGroup,
	SensorsResponse,
	SensorState,
} from '@entities/sensors.interfaces';
import {getActionDescription, getApiActions, getApiActionsWithPayload} from '@shared/helpers/store/actions.helper';
import {Period} from '@entities/common.interfaces';

const desc = getActionDescription(StoreModules.Sensors);

export const SensorsActions = {
	resetState: createAction(desc('Clear Store')),
	getSensors: {
		...getApiActions(desc('Get Sensors'), props<{payload: Sensor[]}>()),
		update: createAction(desc('Get Sensors: Update data'), props<{payload: MappedSensors}>()),
		setTimestamp: createAction(
			desc('Get Sensors: Set timestamp'),
			props<{payload: SensorsResponse['timestamp']}>()
		),
	},
	localSearch: createAction(desc('Sensor List: local search'), props<{text: string}>()),
	getSensorDetails: getApiActions(desc('Get Sensor Details'), props<{payload: Sensor}>()),
	getSensorChart: getApiActionsWithPayload(
		desc('Get Sensor Chart'),
		props<{period: Period}>(),
		props<{payload: Sensor}>()
	),
	switchSensor: getApiActionsWithPayload(
		desc('Switch Sensors'),
		props<{sensorId: Sensor['id']; state: SensorState | SensorFullState}>()
	),
	addSchedule: getApiActionsWithPayload(
		desc('Add Schedule'),
		props<{payload: ScheduledState}>(),
		props<{payload: ScheduledState[]}>()
	),
	deleteSchedule: getApiActionsWithPayload(
		desc('Delete Schedule'),
		props<{scheduleId: ScheduledState['scheduleId']}>(),
		props<{payload: ScheduledState[]}>()
	),
	getSchedules: getApiActions(desc('get Schedule'), props<{payload: ScheduledState[]}>()),
	setSensorGroups: createAction(desc('Set Sensor Groups'), props<{payload: Set<SensorGroup>}>()),
	polling: {
		start: createAction(desc('Start Sensors Polling')),
		stop: createAction(desc('Stop Sensors Polling')),
		stopByVisibility: createAction(desc('Stop Sensors Polling by Page Visibility API')),
	},
	getIcons: getApiActions(desc('Get Icons'), props<{payload: Icon[]}>()),
	getFavourites: getApiActions(desc('Get Favourites List'), props<{payload: Sensor['id'][]}>()),
	toggleFavourites: getApiActionsWithPayload(
		desc('Add/remove from Favourites List'),
		props<{id: Sensor['id']}>(),
		props<{payload: Sensor['id'][]}>()
	),
};
