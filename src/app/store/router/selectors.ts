import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export const selectRouter = createFeatureSelector<fromRouter.RouterReducerState>('router');

const {
	selectCurrentRoute, // select the current route
	selectRouteParams,
	selectRouteParam,
	selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouter);

export const RouterSelectors = {
	selectCurrentRoute,
	selectRouteParam,
	selectRouteParams,
	selectUrl,
	url: createSelector(selectUrl, (url) => url?.substr(1)),
};
