import { combineReducers } from 'redux';

import standup from './standup/standup';

const rootReducer = combineReducers({
    standup
})

export default rootReducer;

/*

streams: string[],
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