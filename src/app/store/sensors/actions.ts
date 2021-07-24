import {createAction, props} from '@ngrx/store';
import {StoreModules} from '@entities/store.interfaces';
import {SensorsApiResponse} from '@entities/sensors.interfaces';

const moduleName = StoreModules.Sensors;

const desc = (name: string): string => `[${moduleName}] ${name}`;

export const SensorsActions = {
	getSensors: {
		requested: createAction(desc('Get Sensors Requested')),
		succeeded: createAction(desc('Get Sensors Succeeded'), props<{payload: SensorsApiResponse}>()),
		failed: createAction(desc('Get Sensors Failed'), props<{error?: string}>()),
	},
};
