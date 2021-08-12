import {on, ReducerTypes} from '@ngrx/store';
import {ActionCreatorWithPayload, ActionsCreatorCombined, AnyObject, ApiActions} from './actions.helper';
import {flow, set} from './immutable.helper';
import {status} from '@entities/store.interfaces';
/* eslint-disable */
export const getApiActionReducers =
	<State extends AnyObject>() =>
	<Payload extends AnyObject, Keys extends keyof State, RequestPayload extends AnyObject>(
		action: ApiActions<Payload, RequestPayload>,
		storeDataKey: Keys
	): ReducerTypes<State, ActionsCreatorCombined<Payload>[]>[] => {
		const loadingStatusProperty = `${storeDataKey as string}LoadingStatus`;

		return [
			on(action.requested as ActionsCreatorCombined<Payload>, (state) =>
				set(loadingStatusProperty, status.loading, state)
			),
			on(action.succeeded as ActionCreatorWithPayload<Payload>, (state, {payload}) =>
				flow(state)(set(loadingStatusProperty, status.loaded), set(storeDataKey as string, payload))
			),
			on(action.failed, (state, {error}) => set(loadingStatusProperty, status.error(error), state)),
		];
	};

export const getApiActionReducersWithoutPayload =
	<State extends AnyObject>() =>
	<Payload extends AnyObject, Keys extends keyof State, RequestPayload extends AnyObject>(action: ApiActions<Payload, RequestPayload>, storeLoadingStatusKey: Keys): ReducerTypes<State, any>[] => {
		return [
			on(action.requested as ActionsCreatorCombined<Payload>, (state) =>
				set(storeLoadingStatusKey as string, status.loading, state)
			),
			on(action.succeeded as ActionsCreatorCombined<Payload>, (state) =>
				set(storeLoadingStatusKey as string, status.loaded, state)
			),
			on(action.failed, (state, {error}) => set(storeLoadingStatusKey as string, status.error(error), state)),
		];
	};
