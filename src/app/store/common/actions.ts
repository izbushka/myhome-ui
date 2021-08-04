import {createAction, props} from '@ngrx/store';
import {StoreModules} from '@entities/store.interfaces';
import {ActionsHelper} from '@shared/helpers/store/actions.helper';
import {AppState} from '@store/rootReducer';
import {LeftPanelModes} from '@entities/common.interfaces';

const desc = ActionsHelper.getDescription<AppState>(StoreModules.Common);

export const CommonActions = {
	resetState: createAction(desc('Clear Store')),
	openLeftPanel: createAction(desc('Set Left Panel Open State'), props<{isOpen: boolean}>()),
	setLeftPanelMode: createAction(desc('Set Left Panel Mode'), props<{mode: LeftPanelModes}>()),
	appInit: createAction(desc('App init')),
};
