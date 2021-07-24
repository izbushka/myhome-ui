import {ApiActions, ErrorPayload} from './actions.helper';
import {defer, of, OperatorFunction} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {TypedAction} from '@ngrx/store/src/models';

/**
 * Applies a given project function to each value emitted by the source Observable.
 * Emits a FAILED action if an error occurs. Emits a SUCCEEDED action with/without payload if a data load is successful.
 * @param action - data loading action types.
 */
export function mapActionsFn<ResponsePayload, RequestParams>(
	action: ApiActions<{payload: ResponsePayload}, RequestParams>
): OperatorFunction<
	ResponsePayload,
	({payload: ResponsePayload} & TypedAction<string>) | (ErrorPayload & TypedAction<string>)
> {
	return (source) =>
		defer(() =>
			source.pipe(
				map((data) => action.succeeded({payload: data})),
				catchError((error: ErrorPayload) => of(action.failed(error)))
			)
		);
}
