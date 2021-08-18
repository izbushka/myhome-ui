import {createSelector, Selector} from '@ngrx/store';
import {MemoizedSelector} from '@ngrx/store/src/selector';
import {AnyObject} from '@shared/helpers/store/actions.helper';

export const createStateSelector = <T extends AnyObject, K extends keyof T, State = AnyObject>(
	getState: Selector<State, T>,
	prop: K
): MemoizedSelector<State, T[K]> =>
	createSelector(getState, (state) => {
		if (!state) {
			throw Error('State is not defined');
		}

		if (!(prop in state)) {
			throw Error(`${JSON.stringify(prop)} - unknown state property`);
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return state[prop];
	});

// TODO: doesnt work
export const createSelectorForGivenModule =
	<T extends AnyObject, K extends keyof T, State = AnyObject>(getState: Selector<State, T>) =>
	(prop: K): MemoizedSelector<State, T[K]> =>
		createStateSelector(getState, prop);
