import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';
import reducers from '../../reducers';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers, applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga);

export default store;