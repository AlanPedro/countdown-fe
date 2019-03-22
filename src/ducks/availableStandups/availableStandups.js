// standup.js
import { call, put, take } from 'redux-saga/effects';

import Api from '../../api/standup';

// Types
const GET_ALL = "duck/standup/GET_ALL";
const GET_ALL_SUCCESS = "duck/standup/GET_ALL_SUCCESS";
const GET_ALL_FAILURE = "duck/standup/GET_ALL_FAILURE";

// Reducer
export default function reducer(state = {}, action) {
    switch(action.type) {
        case GET_ALL_SUCCESS:
            return action.payload.standups;
        default:
            return state;
    }
}

// Actions
const getAllStandups = () => ({ type: GET_ALL });
const getAllStandupsSuccess = (standups) => ({ type: GET_ALL_SUCCESS, payload: { standups } });
const getAllStandupsFailure = (standups) => ({ type: GET_ALL_FAILURE });

// Sagas

function* getAllStandupsSaga() {
    yield take(types.GET_ALL);
    try {
        const allStandups = yield call(Api.getAllStandups);
        yield put(actions.getAllStandupsSuccess(allStandups))
    } catch (e) {
        yield put(actions.getAllStandupsFailure(e.message))
    }
}

export const actions = {
    getAllStandups,
    getAllStandupsSuccess,
    getAllStandupsFailure
};

export const types = {
    GET_ALL,
    GET_ALL_FAILURE,
    GET_ALL_SUCCESS
};

export const availableStandupsSagas = [
    getAllStandupsSaga()
];
