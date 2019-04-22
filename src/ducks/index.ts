import { combineReducers } from 'redux';

import standup, { StandupState } from './standup';
import allStandups, { AllStandupsState } from './allStandups';

export type ApplicationState = {
    readonly standup: StandupState;
    readonly allStandups: AllStandupsState;
  };

const rootReducer = combineReducers<ApplicationState>({
    standup,
    allStandups: allStandups
});

export default rootReducer;
