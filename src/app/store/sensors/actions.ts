import {createAction, props} from '@ngrx/store';
import {StoreModules} from '@entities/store.interfaces';
import {SensorGroup, SensorsApiResponse} from '@entities/sensors.interfaces';
import {ActionsHelper} from '@shared/helpers/store/actions.helper';
import {AppState} from '@store/rootReducer';

const desc = ActionsHelper.getDescription<AppState>(StoreModules.Sensors);

export const SensorsActions = {
	getSensors: {
		requested: createAction(desc('Get Sensors Requested')),
		succeeded: createAction(desc('Get Sensors Succeeded'), props<{payload: SensorsApiResponse}>()),
		failed: createAction(desc('Get Sensors Failed'), props<{error?: string}>()),
	},
	setSensorGroups: createAction(desc('Set Sensor Groups'), props<{payload: Set<SensorGroup>}>()),
};
