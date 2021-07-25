import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {StoreModules} from '@entities/store.interfaces';
import {sensorsReducer, SensorsState} from '@store/sensors/reducer';
import {authReducer, AuthState} from '@store/auth/reducer';

export const reducers = {
	[StoreModules.Router]: routerReducer,
	[StoreModules.Sensors]: sensorsReducer,
	[StoreModules.Auth]: authReducer,
};

export interface AppState extends Record<StoreModules, unknown> {
	[StoreModules.Router]: RouterReducerState;
	[StoreModules.Sensors]: SensorsState;
	[StoreModules.Auth]: AuthState;
}
