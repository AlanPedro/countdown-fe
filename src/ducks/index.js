import { combineReducers } from 'redux';

import standup from './standup/standup';
import availableStandups from './availableStandups/availableStandups.js';

const rootReducer = combineReducers({
    standup,
    availableStandups
})

export default rootReducer;

/*

availableStandups: string[],
standup: {
    name: string,
    time: number,
    currentSpeaker: string / number,
    teams: [
        {
            name: string,
            speaker: string,
        }
    ]
}


*/