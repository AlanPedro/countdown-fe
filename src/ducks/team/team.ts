// standup.js
import {call, put, takeLatest} from 'redux-saga/effects';
import { createStandardAction, ActionType } from 'typesafe-actions';
import Api from '../../api/standup';
import { TeamActionsTypes as types, TeamState } from './types';
import { SuccessErrorCallback, TeamMember, TeamDto} from '../../../@types/countdown';

const initialState: TeamState = {
    id: 0,
    name: "",
    members: [],
    displayName: "",
};

// Reducer
export default function reducer(state = initialState, action: TeamActions) {
    switch(action.type) {
        case types.GET_BY_NAME_SUCCESS:
            const team = action.payload;
            return {
                id: team.id,
                name: team.name,
                displayName: team.displayName,
                members: team.teams.map((t: TeamMember) => Object.assign(t, { randomNumber: Math.random()} ))
            };
        case types.GET_BY_NAME_FAILURE:
            // Logic
            return state;
        default:
            return state;
    }
}

// Actions
const getTeamByName = createStandardAction(types.GET_BY_NAME)<string>();
const getTeamByNameSuccess = createStandardAction(types.GET_BY_NAME_SUCCESS)<TeamDto>();
const getTeamByNameFailure = createStandardAction(types.GET_BY_NAME_FAILURE)<string>();

const createTeam = createStandardAction(types.CREATE).map(
    (team: TeamDto, meta: SuccessErrorCallback) => ({
        payload: { team: team, onSuccess: meta.onSuccess, onError: meta.onError }
    })
);
const editTeam = createStandardAction(types.EDIT).map(
    (team: TeamDto, meta: SuccessErrorCallback) => ({
        payload: { team: team, onSuccess: meta.onSuccess, onError: meta.onError }
    })
);

export type TeamActions = ActionType<typeof actions>

export const actions = {
    getTeamByName,
    getTeamByNameSuccess,
    getTeamByNameFailure,
    editTeam,
    createTeam
};

function* getStandupWrapper(action: ActionType<typeof getTeamByName>) {
    const team = yield call(getStandupByName, action.payload);
    yield put(actions.getTeamByNameSuccess(team));
}

function* getStandupByName(name: string) {
    try {
        return yield call(Api.getTeamByName, name);
    } catch (e) {
        yield put(actions.getTeamByNameFailure(name))
    }
}

function* editTeamSaga(action: ActionType<typeof editTeam>) {
    try {
        yield call(Api.editTeam, action.payload.team);
        yield call(action.payload.onSuccess)
    } catch (e) {
        yield call(action.payload.onError, e.code)
    }
}

function* createTeamSaga(action: ActionType<typeof createTeam>) {
    try {
        yield call(Api.createTeam, action.payload.team);
        yield call(action.payload.onSuccess)
    } catch (e) {
        yield call(action.payload.onError, e.code)
    }
}

function* getTeamByNameListener() {
    yield takeLatest(types.GET_BY_NAME, getStandupWrapper);
}

function* editTeamListener() {
    yield takeLatest(types.EDIT, editTeamSaga)
}

function* createTeamListener() {
    yield takeLatest(types.CREATE, createTeamSaga)
}

export const allTeamSagas = [
    getTeamByNameListener(),
    editTeamListener(),
    createTeamListener(),
];