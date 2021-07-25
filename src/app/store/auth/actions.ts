import {createAction, props} from '@ngrx/store';
import {StoreModules} from '@entities/store.interfaces';
import {ActionsHelper} from '@shared/helpers/store/actions.helper';
import {AppState} from '@store/rootReducer';

const desc = ActionsHelper.getDescription<AppState>(StoreModules.Auth);

export const AuthActions = {
	authorize: createAction(desc('Authorize')),
	unAuthorize: createAction(desc('UnAuthorize'), props<{payload: string}>()),
};
