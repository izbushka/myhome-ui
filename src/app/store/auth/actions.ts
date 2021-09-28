import {createAction, props} from '@ngrx/store';
import {StoreModules} from '@entities/store.interfaces';
import {getActionDescription, getApiActions} from '@shared/helpers/store/actions.helper';
import {AuthUser} from '@shared/entities/auth.interfaces';

const desc = getActionDescription(StoreModules.Auth);

export const AuthActions = {
	authorize: createAction(desc('Authorize')),
	unAuthorize: createAction(desc('UnAuthorize'), props<{payload?: string}>()),
	setToken: createAction(desc('Set Token'), props<{payload?: string}>()),
	removeToken: createAction(desc('Remove Token')),
	getUser: getApiActions(desc('Get User'), props<{payload: AuthUser}>()),
	logout: getApiActions(desc('Logout User')),
};
