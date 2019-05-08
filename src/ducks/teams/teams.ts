// standup.js
import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '../../api/standup';
import { TeamNames } from '../../../@types/countdown';
import { TeamsState, AllTeamsActionTypes, TeamsAction, GetAllTeamsAction } from './types';

const initialState: TeamsState = [];

// Reducer
export default function reducer<TeamsState>(state = initialState, action: TeamsAction) {
    switch(action.type) {
        case AllTeamsActionTypes.GET_ALL_SUCCESS:
            return action.payload.teams;
        default:
            return state;
    }
}

// Actions
function getAllTeams(): TeamsAction {
    return { type: AllTeamsActionTypes.GET_ALL }
}
function getAllTeamsSuccess(teams: TeamNames[]): TeamsAction {
    return { type: AllTeamsActionTypes.GET_ALL_SUCCESS, payload: { teams } }
}
function getAllTeamsFailure(errorMessage: string): TeamsAction {
    return { type: AllTeamsActionTypes.GET_ALL_FAILURE, payload: { message: errorMessage} }
}

// Sagas
function* getAllTeamsSaga(action: GetAllTeamsAction) {
    try {
        const allTeams = yield call(Api.getAllTeams);
        yield put(actions.getAllTeamsSuccess(allTeams))
    } catch (e) {
        yield put(actions.getAllTeamsFailure(e.message))
    }
}

function* getAllTeamsListener() {
    yield takeLatest(AllTeamsActionTypes.GET_ALL, getAllTeamsSaga)
}

export const actions = {
    getAllTeams: getAllTeams,
    getAllTeamsSuccess: getAllTeamsSuccess,
    getAllTeamsFailure: getAllTeamsFailure
};

export const allTeamsSagas = [
    getAllTeamsListener()
];
