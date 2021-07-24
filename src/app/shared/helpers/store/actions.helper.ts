import {createAction, props, Action, ActionCreator} from '@ngrx/store';
import {NotAllowedCheck, ActionCreatorProps, TypedAction} from '@ngrx/store/src/models';

/* eslint-disable */
/**
 * Generates a unique description of the action
 * @param moduleName - name of the module to which the action belongs
 * @param id - identifier of the module's part to which the action belongs
 * @param description - description of what the action does
 */
export const getActionDescription = (moduleName: string, id: string, description?: string): string =>
	`[${moduleName}] ${id} ${description || ''}`;

/**
 * General data loading actions
 */
export interface DataLoadingActions {
	requested: Action;
	succeeded: Action;
	failed: Action;
}

/**
 * Default error payload
 */
export interface ErrorPayload {
	error: string;
}

/**
 * Typed api actions
 */
export interface ApiActions<T1 extends {}, T2 extends {} = {}, S1 extends string = string, S2 extends string = string> {
	requested: ActionCreator<S2, (props?: T2 & NotAllowedCheck<T2>) => T2 & TypedAction<S2>>;
	succeeded: ActionCreator<S1, (props: T1 & NotAllowedCheck<T1>) => T1 & TypedAction<S1>>;
	failed: ActionCreator<string, (props: ErrorPayload) => ErrorPayload & TypedAction<string>>;
}

/**
 * Returns a function that generates actions needed to load data for a given module. Warning! A generated requested action has no payload.
 * @param moduleName - name of the module to which the action belongs.
 * @remarks
 * @example
 * ```ts
 * const moduleName = 'Admin Page';
 * const getApiActions = getApiActionsForGivenModule(moduleName);
 *
 * const getPlanDetails = getApiActions('Selected plan details', props<{data: AdminPage.PlanDetails}>());
 *
 * getPlanDetails.requested();
 * getPlanDetails.succeeded({data: []});
 * getPlanDetails.failed({error: 'Internal server error - 500'});
 * ```
 */
export const getApiActionsForGivenModule = (moduleName: string) => <T1 extends {}>(
	action = '',
	succeedActionProps?: ActionCreatorProps<T1> & NotAllowedCheck<T1>,
	failedActionProps = props<ErrorPayload>()
): ApiActions<T1> => ({
	requested: createAction(getActionDescription(moduleName, `${action} requested`)),
	succeeded: createAction(getActionDescription(moduleName, `${action} request was succeeded`), succeedActionProps),
	failed: createAction(getActionDescription(moduleName, `${action} request failed`), failedActionProps)
});

/**
 * Returns a function that generates actions needed for side effects for a given module.
 * @param moduleName - name of the module to which the action belongs.
 * @remarks
 * @example
 * ```ts
 * const moduleName = 'Plans';
 * const getApiActionWithRequestedPayload = getApiActionsWithRequestedPayloadForGivenModule(moduleName);
 *
 * const lockPlan = getApiActionWithRequestedPayload('Lock Plan', props<{force?: boolean}>(), props<{response: []}>());
 *
 * lockPlan.requested({force: true});
 * lockPlan.succeeded({response: []});
 * lockPlan.failed({error: 'Internal server error - 500'});
 * ```
 */
export const getApiActionsWithRequestedPayloadForGivenModule = (moduleName: string) => <T1 extends {}, T2 extends {}>(
	action = '',
	requestedActionProps: ActionCreatorProps<T1> & NotAllowedCheck<T1>,
	succeedActionProps?: ActionCreatorProps<T2> & NotAllowedCheck<T2>,
	failedActionProps = props<ErrorPayload>()
): ApiActions<T2, T1> => ({
	requested: createAction(getActionDescription(moduleName, `${action} requested`), requestedActionProps),
	succeeded: createAction(getActionDescription(moduleName, `${action} request was succeeded`), succeedActionProps),
	failed: createAction(getActionDescription(moduleName, `${action} request failed`), failedActionProps)
});

/**
 * Returns a function that generates actions needed for side effects for a given module.
 * @param moduleName - name of the module to which the action belongs
 * @remarks
 * @example
 * ```ts
 * const moduleName = 'Navigation';
 * const getSideEffectsActions = getSideEffectActionsForGivenModule(moduleName);
 *
 * const selectPage = getSideEffectActions('Page selected', props<{page: Page}>(), props<{page: Page}>());
 *
 * selectPage.requested({page: null});
 * selectPage.finished({page: null});
 * ```
 */
export const getSideEffectActionsForGivenModule = (moduleName: string) => {
	return function<T1 extends {}, T2 extends {}>(
		id: string,
		requestedActionProps?: ActionCreatorProps<T1> & NotAllowedCheck<T1>,
		finishedActionProps?: ActionCreatorProps<T2> & NotAllowedCheck<T2>
	) {
		return {
			requested: createAction(getActionDescription(moduleName, id, 'requested'), requestedActionProps),
			finished: createAction(getActionDescription(moduleName, id, 'finished'), finishedActionProps)
		};
	};
};

/**
 * Returns a function that generates actions needed for short polling for a given module.
 * @param moduleName - name of the module to which the action belongs.
 * @remarks
 * @example
 * ```ts
 * const moduleName = 'Campaigns';
 * const getShortPollingActions = getShortPollingActionsForGivenModule(moduleName);
 *
 * const shortPollingActions = getShortPollingActions('Campaigns Short Polling');
 *
 * shortPollingActions.start();
 * shortPollingActions.stop();
 * ```
 */
export const getShortPollingActionsForGivenModule = (moduleName: string) => (id: string) => ({
	start: createAction(getActionDescription(moduleName, id, 'started')),
	stop: createAction(getActionDescription(moduleName, id, 'stopped'))
});

/**
 * Returns a function that generates actions needed for AmcSelect for a given module.
 * @param moduleName - name of the module to which the action belongs.
 * @remarks
 * @example
 * ```ts
 * const moduleName = 'Ranker';
 * const getSelectorActions = getSelectorActionsForGivenModule(moduleName);
 *
 * const typeSelector = getSelectorActions('Type selector', props<{item: Selectors.ActiveChange<FilterPanel.SelectorFieldData>}>(), props<{item: Selectors.FilterChange}>());
 * ```
 */
export const getSelectorActionsForGivenModule = (moduleName: string) => <T1 extends {}, T2 extends {}>(
	action = '',
	activeProps?: ActionCreatorProps<T1> & NotAllowedCheck<T1>,
	filterProps?: ActionCreatorProps<T2> & NotAllowedCheck<T2>
) => ({
	select: createAction(getActionDescription(moduleName, `${action} activated`), activeProps),
	filter: createAction(getActionDescription(moduleName, `${action} filtered`), filterProps)
});
