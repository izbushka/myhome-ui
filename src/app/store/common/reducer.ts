import {createReducer, on} from '@ngrx/store';
import {nameOfFactory} from '@entities/nameof.constants';
import {set} from '@shared/helpers/store/immutable.helper';
import {CommonActions} from '@store/common/actions';
import {LeftPanelModes} from '@entities/common.interfaces';

export interface CommonState {
	leftPanelState: boolean;
	leftPanelMode: LeftPanelModes;
}

export const initialCommonState: CommonState = {
	leftPanelState: true,
	leftPanelMode: LeftPanelModes.Over,
};

export const props = nameOfFactory<CommonState>();

export const commonReducer = createReducer(
	initialCommonState,
	on(CommonActions.resetState, () => initialCommonState),
	on(CommonActions.openLeftPanel, (state, {isOpen}) => set(props('leftPanelState'), isOpen, state)),
	on(CommonActions.setLeftPanelMode, (state, {mode}) => set(props('leftPanelMode'), mode, state))
);
