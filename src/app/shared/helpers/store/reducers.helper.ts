import {ActionCreator, on, ReducerTypes} from '@ngrx/store';
import {ApiActions} from './actions.helper';
import {Params} from '@angular/router';
import {flow, set} from './immutable.helper';

export const getDataLoaderReducerWithoutPayloadFn =
	<State extends Params>() =>
	<Payload extends Params, Keys extends keyof State>(
		action: ApiActions<Payload>,
		storeLoadingStatusDataKey: Keys
	): ReducerTypes<State>[] =>
		[
			on(action.requested, (state: State) => set(storeLoadingStatusDataKey as string, status.loading, state)),
			on(action.succeeded, (state: State) => set(storeLoadingStatusDataKey as string, status.loaded, state)),
			on(action.failed, (state: State, {error}) =>
				set(storeLoadingStatusDataKey as string, status.error(error), state)
			),
		];

export const getDataLoaderReducerFn =
	<State extends Params>() =>
	<Payload extends Params, Keys extends keyof State>(
		action: ApiActions<Payload>,
		storeDataKey: Keys
	): ReducerTypes<State>[] => {
		const loadingStatusProperty = `${storeDataKey as string}LoadingStatus`;

		return [
			on(action.requested, (state: State) => set(loadingStatusProperty, status.loading, state)),
			on(action.succeeded, (state: State, {payload}: {payload: Payload} & ActionCreator) =>
				flow(state)(set(loadingStatusProperty, status.loaded), set(storeDataKey as string, payload))
			),
			on(action.failed, (state: State, {error}) => set(loadingStatusProperty, status.error(error), state)),
		];
	};
