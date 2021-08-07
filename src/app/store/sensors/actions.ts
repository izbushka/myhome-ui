import {createAction, props} from '@ngrx/store';
import {StoreModules} from '@entities/store.interfaces';
import {
	Icon,
	MappedSensors,
	Sensor,
	SensorFullState,
	SensorGroup,
	SensorsResponse,
	SensorState,
} from '@entities/sensors.interfaces';
import {ActionsHelper} from '@shared/helpers/store/actions.helper';
import {AppState} from '@store/rootReducer';
import {Period} from '@entities/common.interfaces';

const desc = ActionsHelper.getDescription<AppState>(StoreModules.Sensors);

export const SensorsActions = {
	resetState: createAction(desc('Clear Store')),
	getSensors: {
		requested: createAction(desc('Get Sensors Requested')),
		succeeded: createAction(desc('Get Sensors Succeeded')),
		failed: createAction(desc('Get Sensors Failed'), props<{error?: string}>()),
		update: createAction(desc('Get Sensors: Update data'), props<{payload: MappedSensors}>()),
		setTimestamp: createAction(
			desc('Get Sensors: Set timestamp'),
			props<{payload: SensorsResponse['timestamp']}>()
		),
	},
	getSensorDetails: {
		requested: createAction(desc('Get Sensor Details Requested')),
		succeeded: createAction(desc('Get Sensor Details Succeeded'), props<{payload: Sensor}>()),
		failed: createAction(desc('Get Sensor Details Failed'), props<{error?: string}>()),
	},
	getSensorChart: {
		requested: createAction(desc('Get Sensor Chart Requested'), props<{period: Period}>()),
		succeeded: createAction(desc('Get Sensor Chart Succeeded'), props<{payload: Sensor}>()),
		failed: createAction(desc('Get Sensor Chart Failed'), props<{error?: string}>()),
	},
	switchSensor: {
		requested: createAction(
			desc('Switch Sensors Requested'),
			props<{sensorId: Sensor['id']; state: SensorState | SensorFullState}>()
		),
		succeeded: createAction(desc('Switch Sensors Succeeded')),
		failed: createAction(desc('Switch Sensors Failed'), props<{error?: string}>()),
	},
	setSensorGroups: createAction(desc('Set Sensor Groups'), props<{payload: Set<SensorGroup>}>()),
	polling: {
		start: createAction(desc('Start Sensors Polling')),
		stop: createAction(desc('Stop Sensors Polling')),
		stopByVisibility: createAction(desc('Stop Sensors Polling by Page Visibility API')),
	},
	getIcons: {
		requested: createAction(desc('Get Icons Requested')),
		succeeded: createAction(desc('Get Icons Succeeded'), props<{payload: Icon[]}>()),
		failed: createAction(desc('Get Icons Failed'), props<{error?: string}>()),
	},
};
