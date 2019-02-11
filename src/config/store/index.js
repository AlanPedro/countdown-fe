import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise';

import reducers from '../../reducers';

const store = createStore(
    reducers, applyMiddleware(promise, logger)
)

export default store;