import {createAction, props} from '@ngrx/store';
import {StoreModules} from '@entities/store.interfaces';
import {
	Icon,
	MappedSensors,
	Sensor,
	SensorFullState,
	SensorGroup,
	SensorsApiResponse,
	SensorState,
} from '@entities/sensors.interfaces';
import {ActionsHelper} from '@shared/helpers/store/actions.helper';
import {AppState} from '@store/rootReducer';

const desc = ActionsHelper.getDescription<AppState>(StoreModules.Sensors);

export const SensorsActions = {
	getSensors: {
		requested: createAction(desc('Get Sensors Requested')),
		succeeded: createAction(desc('Get Sensors Succeeded')),
		failed: createAction(desc('Get Sensors Failed'), props<{error?: string}>()),
		update: createAction(desc('Get Sensors: Update data'), props<{payload: MappedSensors}>()),
		setTimestamp: createAction(
			desc('Get Sensors: Set timestamp'),
			props<{payload: SensorsApiResponse['timestamp']}>()
		),
	},
	switchSensor: {
		requested: createAction(
			desc('Switch Sensors Requested'),
			props<{sensorId: Sensor['sensor_id']; state: SensorState | SensorFullState}>()
		),
		succeeded: createAction(desc('Switch Sensors Succeeded')),
		failed: createAction(desc('Switch Sensors Failed'), props<{error?: string}>()),
	},
	setSensorGroups: createAction(desc('Set Sensor Groups'), props<{payload: Set<SensorGroup>}>()),
	polling: {
		start: createAction(desc('Start Sensors Polling')),
		stop: createAction(desc('Stop Sensors Polling')),
	},
	getIcons: {
		requested: createAction(desc('Get Icons Requested')),
		succeeded: createAction(desc('Get Icons Succeeded'), props<{payload: Icon[]}>()),
		failed: createAction(desc('Get Icons Failed'), props<{error?: string}>()),
	},
};
