import { combineReducers } from 'redux';

import standup from './standupReducer';
import timer from './timerReducer';
import current from './currentIndexReducer';

const rootReducer = combineReducers({
    standup,
    timer,
    current
})

export default rootReducer;