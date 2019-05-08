// standup.js
import { createStandardAction, ActionType } from 'typesafe-actions';
import { ProjectActionTypes as types, ProjectState } from './types';
import { ProjectNames } from '../../../@types/countdown';
import { put, takeLatest, call } from 'redux-saga/effects';

const initialState: ProjectState = [];

// Reducer
export default function reducer<ProjectState>(state = initialState, action: ProjectActions) {
    switch(action.type) {
        case types.GET_ALL_SUCCESS:
            return action.payload;
        case types.GET_ALL_FAILURE:
            // Logic for failure
            return state || [];
        default:
            return state;
    }
}

// Actions
const getAllProjects = createStandardAction(types.GET_ALL)();
const getAllProjectsSuccess = createStandardAction(types.GET_ALL_SUCCESS)<ProjectNames[]>();
const getAllProjectsFailure = createStandardAction(types.GET_ALL_FAILURE)();

export type ProjectActions = ActionType<typeof projectActions>

export const projectActions = {
    getAllProjects,
    getAllProjectsSuccess,
    getAllProjectsFailure
};

function* getAllProjectsSaga(action: any) {
    try {
        const allProjects = yield call(allProj);
        yield put(projectActions.getAllProjectsSuccess(allProjects));
    } catch (e) {
        yield put(projectActions.getAllProjectsFailure());
    }
}

function* getAllProjectsListener() {
    yield takeLatest(types.GET_ALL, getAllProjectsSaga)
}

export const allProjectsSagas = [
    getAllProjectsListener()
];

const allProj = () => [
    {
        name: "auk",
        displayName: "Access UK"
    },
    {
        name: "eue",
        displayName: "EU Exit"
    },
    {
        name: "leap",
        displayName: "Digital Leap"
    }
];
