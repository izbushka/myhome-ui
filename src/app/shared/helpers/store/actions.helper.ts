import {ActionCreator, ActionCreatorProps, createAction, NotAllowedCheck, props} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';

export interface ErrorPayload {
	error: string;
}

export interface AnyObject {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	[key: string]: any;
}
export type ActionCreatorWithoutPayload<T extends string = string> = ActionCreator<T, () => TypedAction<T>>;
export type ActionCreatorWithPayload<Payload extends AnyObject, T extends string = string> = ActionCreator<
	T,
	(props: Payload & NotAllowedCheck<Payload>) => Payload & TypedAction<T>
>;
export type ActionCreatorForFailed = ActionCreator<string, (props: ErrorPayload) => ErrorPayload & TypedAction<string>>;
export type ActionsCreatorCombined<Payload extends AnyObject> =
	| ActionCreatorWithoutPayload
	| ActionCreatorWithPayload<Payload>
	| ActionCreatorForFailed;

export interface ApiActionsWithSuccessPayload<Payload extends AnyObject> {
	requested: ActionCreatorWithoutPayload;
	succeeded: ActionCreatorWithPayload<Payload>;
	failed: ActionCreatorForFailed;
}

export interface ApiActionsWithoutPayload {
	requested: ActionCreatorWithoutPayload;
	succeeded: ActionCreatorWithoutPayload;
	failed: ActionCreatorForFailed;
}

interface ApiActionsWithRequestPayload<T extends AnyObject> {
	requested: ActionCreatorWithPayload<T>;
	succeeded: ActionCreatorWithoutPayload;
	failed: ActionCreatorForFailed;
}

interface ApiActionsWithRequestAndSuccessPayload<RequestPayload extends AnyObject, SuccessPayload extends AnyObject> {
	requested: ActionCreatorWithPayload<RequestPayload>;
	succeeded: ActionCreatorWithPayload<SuccessPayload>;
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

export function getApiActions<SuccessPayload extends AnyObject>(
	action: string,
	succeedActionProps: ActionCreatorProps<SuccessPayload> & NotAllowedCheck<SuccessPayload>,
	failedActionProps?: ActionCreatorProps<ErrorPayload> & NotAllowedCheck<ErrorPayload>
): ApiActionsWithSuccessPayload<SuccessPayload>;

export function getApiActions(
	action: string,
	failedActionProps?: ActionCreatorProps<ErrorPayload> & NotAllowedCheck<ErrorPayload>
): ApiActionsWithoutPayload;

export function getApiActions<SuccessPayload extends AnyObject>(
	action: string,
	succeedActionProps?: ActionCreatorProps<SuccessPayload> & NotAllowedCheck<SuccessPayload>,
	failedActionProps = props<ErrorPayload>()
): ApiActions<SuccessPayload> {
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
