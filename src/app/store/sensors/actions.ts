import {createAction, props} from '@ngrx/store';
import {StoreModules} from '@entities/store.interfaces';
import {MappedSensors, SensorGroup, SensorsApiResponse} from '@entities/sensors.interfaces';
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
	setSensorGroups: createAction(desc('Set Sensor Groups'), props<{payload: Set<SensorGroup>}>()),
	polling: {
		start: createAction(desc('Start Sensors Polling')),
		stop: createAction(desc('Stop Sensors Polling')),
	},
};
