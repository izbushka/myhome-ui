import {ApiActions, ErrorPayload} from './actions.helper';
import {defer, of, OperatorFunction} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {TypedAction} from '@ngrx/store/src/models';

type ActionWithPayload<T> = {payload: T} & TypedAction<string>;
type FailedAction = ErrorPayload & TypedAction<string>;

/**
 * Applies a given project function to each value emitted by the source Observable.
 * Emits a FAILED action if an error occurs. Emits a SUCCEEDED action with/without payload if a data load is successful.
 * @param action - data loading action types.
 */
export function mapApiActions<ResponsePayload, RequestParams>(
	action: ApiActions<{payload: ResponsePayload}, RequestParams>
): OperatorFunction<ResponsePayload, ActionWithPayload<{payload: ResponsePayload}> | FailedAction> {
	return (source) =>
		defer(() =>
			source.pipe(
				map(
					(payload: ResponsePayload) =>
						action.succeeded({payload}) as ActionWithPayload<{payload: ResponsePayload}>
				),
				catchError((error: ErrorPayload) => of(action.failed(error) as FailedAction))
			)
		);
}
