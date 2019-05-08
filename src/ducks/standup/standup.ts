// standup.js
import { createStandardAction, ActionType } from 'typesafe-actions';
import { StandupActionTypes as types, StandupState } from './types';
import { Team, StandupUpdate } from '../../../@types/countdown';

const initialState: StandupState = {
    currentTeam: "",
    currentSpeaker: "",
    time: 60,
    live: false,
    paused: false
};

// Reducer
export default function reducer(state = initialState, action: StandupActions) {
    switch(action.type) {
        case types.INITIALISE:
            const firstTeam = action.payload.members.find(_ => true)!;
            return {
                currentTeam: firstTeam.name,
                currentSpeaker: firstTeam.speaker,
                time: firstTeam.allocationInSeconds,
                live: false,
                paused: true
            };
        case types.UPDATE:
            const { name, speaker, remainingSeconds } = action.payload;
            return {
                live: true,
                currentTeam: name,
                currentSpeaker: speaker,
                time: remainingSeconds,
                paused: state.time === remainingSeconds
            };
        case types.ERROR_INITIALISING:
            console.error("Error getting standup");
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
const initialiseStandup = createStandardAction(types.INITIALISE)<Team>();
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
    leaveStandup
};
