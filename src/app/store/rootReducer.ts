import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {StoreModules} from '@entities/store.interfaces';
import {sensorsReducer, SensorsState} from '@store/sensors/reducer';

export const reducers = {
	[StoreModules.Router]: routerReducer,
	[StoreModules.Sensors]: sensorsReducer,
};

export interface AppState {
	[StoreModules.Router]: RouterReducerState;
	[StoreModules.Sensors]: SensorsState;
}
