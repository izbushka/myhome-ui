import {CommonState, props} from '@store/common/reducer';
import {createStateSelector} from 'amc-common-components/lib/helpers/store/selectors.helper';
import {AppState} from '@store/rootReducer';

export const getCommonModuleState = (state: AppState): CommonState => state.common;

export namespace commonSelectors {
	export const tags = createStateSelector(getCommonModuleState, props('tags'));
	export const presets = createStateSelector(getCommonModuleState, props('presets'));
	export const filtersLoadingStatus = createStateSelector(getCommonModuleState, props('filtersLoadingStatus'));
	export const periods = createStateSelector(getCommonModuleState, props('periods'));
	export const selectedPeriod = createStateSelector(getCommonModuleState, props('selectedPeriod'));
	export const businessAreas = createStateSelector(getCommonModuleState, props('businessAreas'));
	export const busnessAreasStatuses = createStateSelector(getCommonModuleState, props('businessStatuses'));
	export const projects = {
		loadingStatus: createStateSelector(getCommonModuleState, props('projectsLoadingStatus')),
		data: createStateSelector(getCommonModuleState, props('projects')),
		selected: createStateSelector(getCommonModuleState, props('selectedProject')),
	};
}
