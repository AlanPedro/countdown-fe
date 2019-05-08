// standup.js
import { createStandardAction, ActionType } from 'typesafe-actions';
import { StandupActionTypes as types, StandupState } from './types';
import { Standup, Team, StandupUpdate, SuccessErrorCallback } from '../../../@types/countdown';

const initialState: StandupState = {
    id: 0,
    name: "",
    teams: [],
    displayName: "",
    currentTeam: "",
    currentSpeaker: "",
    time: 60,
    live: false,
    paused: false
}

// Reducer
export default function reducer(state = initialState, action: StandupActions) {
    switch(action.type) {
        case types.INITIALISE:
            const standup = action.payload;
            const first = standup.teams.find(_ => true);
            // Todo remove
            const teams = standup.teams.map((t: Team) => Object.assign(t, { randomNumber: Math.random()} ));
            return {
                id: standup.id,
                teams: teams,
                name: standup.name,
                displayName: standup.displayName,
                currentTeam: first!.name,
                currentSpeaker: first!.speaker,
                time: first!.allocationInSeconds,
                live: false,
                paused: true
            };
        case types.UPDATE:
            const { name, speaker, remainingSeconds } = action.payload;
            return {
                id: state.id,
                teams: state.teams,
                name: state.name,
                displayName: state.displayName,
                live: true,
                currentTeam: name,
                currentSpeaker: speaker,
                time: remainingSeconds,
                paused: state.time === remainingSeconds
            };
        case types.ERROR_INITIALISING:
            console.log("Error getting standup");
            return state;
        case types.LEAVE:
            return {
                ...state,
                live: false
            };
        default:
            return state;
    }
}

// Actions
const getStandupByName = createStandardAction(types.GET_BY_NAME)<string>();
const initialiseStandup = createStandardAction(types.INITIALISE)<Standup>();
const errorInitialisingStandup = createStandardAction(types.ERROR_INITIALISING).map(
    (id: string, message: string) => ({ payload: { id, message } })
);
const joinStandup = createStandardAction(types.JOIN)<string>();
const loadStandup = createStandardAction(types.LOAD)<string>();
const startStandup = createStandardAction(types.START)();
const updateStandup = createStandardAction(types.UPDATE)<StandupUpdate>();
const pauseStandup = createStandardAction(types.PAUSE)();
const unpauseStandup = createStandardAction(types.UNPAUSE)();
const toNextSpeaker = createStandardAction(types.NEXT_SPEAKER)();
const leaveStandup = createStandardAction(types.LEAVE)<string>();
const createStandup = createStandardAction(types.CREATE).map(
    (standup: Standup, meta: SuccessErrorCallback) => ({
        payload: { standup: standup, onSuccess: meta.onSuccess, onError: meta.onError }
    })
);
const editStandup = createStandardAction(types.EDIT).map(
    (standup: Standup, meta: SuccessErrorCallback) => ({
        payload: { standup: standup, onSuccess: meta.onSuccess, onError: meta.onError }
    })
);

export type StandupActions = ActionType<typeof actions>

export const actions = {
    initialiseStandup,
    loadStandup,
    errorInitialisingStandup,
    startStandup,
    updateStandup,
    pauseStandup,
    toNextSpeaker,
    joinStandup,
    unpauseStandup,
    leaveStandup,
    getStandupByName,
    editStandup,
    createStandup
};
