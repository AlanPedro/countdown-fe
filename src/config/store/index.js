import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import standupSagas from '../../ducks/standup/standupSagas';
import { availableStandupsSagas } from '../../ducks/availableStandups/availableStandups';
import reducers from '../../ducks';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers, applyMiddleware(sagaMiddleware, logger)
)

const allSagas = [].concat(standupSagas).concat(availableStandupsSagas);

function* rootSaga() {
    yield all(allSagas)
}

sagaMiddleware.run(rootSaga);

export default store;