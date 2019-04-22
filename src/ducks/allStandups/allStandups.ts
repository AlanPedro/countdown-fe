// standup.js
import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '../../api/standup';
import { StandupNames } from '../../../@types/countdown';
import { AllStandupsState, AllStandupsActionTypes, AllStandupsActions, GetAllStandupsAction } from './types';

const initialState: AllStandupsState = []

// Reducer
export default function reducer<AvailableStandupsState>(state = initialState, action: AllStandupsActions) {
    switch(action.type) {
        case AllStandupsActionTypes.GET_ALL_SUCCESS:
            return action.payload.standups;
        default:
            return state;
    }
}

// Actions
function getAllStandups(): AllStandupsActions {
    return { type: AllStandupsActionTypes.GET_ALL } 
}
function getAllStandupsSuccess(standups: StandupNames[]): AllStandupsActions {
    return { type: AllStandupsActionTypes.GET_ALL_SUCCESS, payload: { standups } } 
}
function getAllStandupsFailure(errorMessage: string): AllStandupsActions {
    return { type: AllStandupsActionTypes.GET_ALL_FAILURE, payload: { message: errorMessage} } 
}

// Sagas
function* getAllStandupsSaga(action: GetAllStandupsAction) {
    try {
        const allStandups = yield call(Api.getAllStandups);
        yield put(actions.getAllStandupsSuccess(allStandups))
    } catch (e) {
        yield put(actions.getAllStandupsFailure(e.message))
    }
}

function* getAllStandupsListener() {
    yield takeLatest(AllStandupsActionTypes.GET_ALL, getAllStandupsSaga)
}

export const actions = {
    getAllStandups,
    getAllStandupsSuccess,
    getAllStandupsFailure
};

export const allStandupsSagas = [
    getAllStandupsListener()
];
