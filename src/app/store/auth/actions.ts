import {createAction, props} from '@ngrx/store';
import {StoreModules} from '@entities/store.interfaces';
import {getActionDescription} from '@shared/helpers/store/actions.helper';

const desc = getActionDescription(StoreModules.Auth);

export const AuthActions = {
	authorize: createAction(desc('Authorize')),
	unAuthorize: createAction(desc('UnAuthorize'), props<{payload?: string}>()),
	setToken: createAction(desc('Set Token'), props<{payload?: string}>()),
};
