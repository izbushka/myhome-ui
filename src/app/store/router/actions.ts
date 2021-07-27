import {NavigationExtras, Params, QueryParamsHandling} from '@angular/router';
import {createAction, props} from '@ngrx/store';
import {StoreModules} from '@entities/store.interfaces';
import {AppState} from '@store/rootReducer';
import {ActionsHelper} from '@shared/helpers/store/actions.helper';

const desc = ActionsHelper.getDescription<AppState>(StoreModules.Router);

export interface RouterGoParams {
	url: string | (string | number)[] | [string, Record<string, string | number>];
	extras?: NavigationExtras;
}

export const RouterActions = {
	go: createAction(desc('go'), props<RouterGoParams>()),
	back: createAction(desc('back navigation')),
	setParam: createAction(desc('param setter'), props<{payload: Params; queryParamsHandling?: QueryParamsHandling}>()),
};
