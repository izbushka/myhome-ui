import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {StoreModules} from '@entities/store.interfaces';
import {sensorsReducer, SensorsState} from '@store/sensors/reducer';
import {authReducer, AuthState} from '@store/auth/reducer';
import {commonReducer, CommonState} from '@store/common/reducer';
import {ActionReducer} from '@ngrx/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reducers: Record<StoreModules, ActionReducer<any>> = {
	[StoreModules.Router]: routerReducer,
	[StoreModules.Sensors]: sensorsReducer,
	[StoreModules.Auth]: authReducer,
	[StoreModules.Common]: commonReducer,
};

export interface AppState extends Record<StoreModules, unknown> {
	[StoreModules.Router]: RouterReducerState;
	[StoreModules.Sensors]: SensorsState;
	[StoreModules.Auth]: AuthState;
	[StoreModules.Common]: CommonState;
}
