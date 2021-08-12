import {ActionCreator, ActionCreatorProps, createAction, NotAllowedCheck, props} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';

export interface ErrorPayload {
	error: string;
}

/* eslint-disable-next-line @typescript-eslint/ban-types */
type AnyObject = object;
type ActionCreatorWithoutPayload<T extends string> = ActionCreator<T, () => TypedAction<T>>;
type ActionCreatorWithPayload<T extends string, P extends AnyObject> = ActionCreator<
	T,
	(props: P & NotAllowedCheck<P>) => P & TypedAction<T>
>;
type ActionCreatorForFailed = ActionCreator<string, (props: ErrorPayload) => ErrorPayload & TypedAction<string>>;

interface ApiActionsWithSuccessPayload<T extends AnyObject> {
	requested: ActionCreatorWithoutPayload<string>;
	succeeded: ActionCreatorWithPayload<string, T>;
	failed: ActionCreatorForFailed;
}

interface ApiActionsWithoutPayload {
	requested: ActionCreatorWithoutPayload<string>;
	succeeded: ActionCreatorWithoutPayload<string>;
	failed: ActionCreatorForFailed;
}

interface ApiActionsWithRequestPayload<T extends AnyObject> {
	requested: ActionCreatorWithPayload<string, T>;
	succeeded: ActionCreatorWithoutPayload<string>;
	failed: ActionCreatorForFailed;
}

interface ApiActionsWithRequestAndSuccessPayload<T1 extends AnyObject, T2 extends AnyObject> {
	requested: ActionCreatorWithPayload<string, T1>;
	succeeded: ActionCreatorWithPayload<string, T2>;
	failed: ActionCreatorForFailed;
}

export type ApiActions<SuccessPayload extends AnyObject = AnyObject, RequestPayload extends AnyObject = AnyObject> =
	| ApiActionsWithoutPayload
	| ApiActionsWithSuccessPayload<SuccessPayload>
	| ApiActionsWithRequestPayload<RequestPayload>
	| ApiActionsWithRequestAndSuccessPayload<RequestPayload, SuccessPayload>;

const USED_NAMES: Record<string, boolean> = {};

export function getActionDescription(module: string): (action: string) => string {
	return (action) => {
		const name = `[${module}] ${action}`;
		if (USED_NAMES[name]) {
			throw `Action name "${name}" is already used`;
		}
		USED_NAMES[name] = true;
		return name;
	};
}

export function getApiActions<P extends AnyObject>(
	action: string,
	succeedActionProps: ActionCreatorProps<P> & NotAllowedCheck<P>,
	failedActionProps?: ActionCreatorProps<ErrorPayload> & NotAllowedCheck<ErrorPayload>
): ApiActionsWithSuccessPayload<P>;

export function getApiActions(
	action: string,
	failedActionProps?: ActionCreatorProps<ErrorPayload> & NotAllowedCheck<ErrorPayload>
): ApiActionsWithoutPayload;

export function getApiActions<P extends AnyObject>(
	action: string,
	succeedActionProps?: ActionCreatorProps<P> & NotAllowedCheck<P>,
	failedActionProps = props<ErrorPayload>()
): ApiActions<P> {
	return typeof succeedActionProps === 'undefined'
		? {
				requested: createAction(`${action} requested`),
				succeeded: createAction(`${action} succeeded`),
				failed: createAction(`${action} failed`, failedActionProps),
		  }
		: {
				requested: createAction(`${action} requested`),
				succeeded: createAction(`${action} succeeded`, succeedActionProps),
				failed: createAction(`${action} failed`, failedActionProps),
		  };
}

export function getApiActionsWithPayload<R extends AnyObject, P extends AnyObject>(
	action: string,
	requestActionProps: ActionCreatorProps<R> & NotAllowedCheck<R>,
	succeedActionProps: ActionCreatorProps<P> & NotAllowedCheck<P>,
	failedActionProps?: ActionCreatorProps<ErrorPayload> & NotAllowedCheck<ErrorPayload>
): ApiActionsWithRequestAndSuccessPayload<R, P>;

export function getApiActionsWithPayload<R extends AnyObject>(
	action: string,
	requestActionProps: ActionCreatorProps<R> & NotAllowedCheck<R>,
	failedActionProps?: ActionCreatorProps<ErrorPayload> & NotAllowedCheck<ErrorPayload>
): ApiActionsWithRequestPayload<R>;

export function getApiActionsWithPayload<R extends AnyObject, P extends AnyObject>(
	action: string,
	requestActionProps: ActionCreatorProps<R> & NotAllowedCheck<R>,
	succeedActionProps?: ActionCreatorProps<P> & NotAllowedCheck<P>,
	failedActionProps = props<ErrorPayload>()
): ApiActions<P, R> {
	return typeof succeedActionProps === 'undefined'
		? {
				requested: createAction(`${action} requested`, requestActionProps),
				succeeded: createAction(`${action} succeeded`),
				failed: createAction(`${action} failed`, failedActionProps),
		  }
		: {
				requested: createAction(`${action} requested`, requestActionProps),
				succeeded: createAction(`${action} succeeded`, succeedActionProps),
				failed: createAction(`${action} failed`, failedActionProps),
		  };
}
