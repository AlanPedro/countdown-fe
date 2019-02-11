import { combineReducers } from 'redux';

import standup from './standupReducer';

const rootReducer = combineReducers({
    standup
})

export default rootReducer;