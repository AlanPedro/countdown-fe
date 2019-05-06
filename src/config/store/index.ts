import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import reducers from '../../ducks';
import { standupSagas } from '../../ducks/standup';
import { allTeamsSagas } from '../../ducks/teams';
import { allTeamSagas } from '../../ducks/team';
import { allProjectsSagas } from '../../ducks/projects';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers, applyMiddleware(sagaMiddleware, logger)
);

const allSagas = standupSagas
    .concat(allTeamsSagas)
    .concat(allProjectsSagas)
    .concat(allTeamSagas);

function* rootSaga() {
    yield all(allSagas)
}

sagaMiddleware.run(rootSaga);

export default store;