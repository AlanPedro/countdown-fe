// standup.js
import _ from 'lodash';

// Types
const GET_BY_NAME = "duck/standup/GET_BY_NAME";
const INITIALISE = "duck/standup/INITIALISE";
const JOIN = "duck/standup/JOIN";
const LOAD = "duck/standup/LOAD";
const ERROR_INITIALISING = "duck/standup/ERROR_INITIALISING";
const START = "duck/standup/START";
const UPDATE = "duck/standup/UPDATE";
const PAUSE = "duck/standup/PAUSE";
const LEAVE = "duck/standup/LEAVE";
const UNPAUSE = "duck/standup/UNPAUSE";
const NEXT_SPEAKER = "duck/standup/NEXT_SPEAKER";
const RESET = "duck/standup/RESET";

const EDIT = "duck/standup/EDIT";
const CREATE = "duck/standup/CREATE";

// Reducer
export default function reducer(state = {}, action) {
    switch(action.type) {
        case INITIALISE:
            const { standup } = action.payload;
            const first = standup.teams.find(_ => true);

            // Todo remove
            const teams = standup.teams.map(t => Object.assign(t, { randomNumber: Math.random()} ));

            return {
                id: standup.id,
                teams: teams,
                // teams: standup.teams,
                name: standup.name,
                displayName: standup.displayName,
                currentTeam: first.name,
                currentSpeaker: first.speaker,
                time: first.allocationInSeconds,
                live: false,
                paused: true
            };
        case UPDATE:
            const { name, speaker, remainingSeconds } = action.payload.standup;
            return {
                id: state.id,
                teams: state.teams,
                // teams: standup.teams,
                name: state.name,
                displayName: state.displayName,
                live: true,
                currentTeam: name,
                currentSpeaker: speaker,
                time: remainingSeconds,
                paused: state.time === remainingSeconds
            };
        case ERROR_INITIALISING:
            console.log("Error getting standup");
            return state;
        case LEAVE:
            return _.merge(state, { live: false });
        default:
            return state;
    }
}

// Actions
const getStandupByName = name => ({ type: GET_BY_NAME, payload: { name } });
const startStandup = () => ({ type: START });
const pauseStandup = () => ({ type: PAUSE });
const unpauseStandup = () => ({ type: UNPAUSE });
const leaveStandup = () => ({ type: LEAVE});
const toNextSpeaker = () => ({type: NEXT_SPEAKER});
const joinStandup = name => ({ type: JOIN, payload: { name } });
const initialiseStandup = standup => ({ type: INITIALISE, payload: { standup } });
const errorInitialisingStandup = (id, message) => ( { 
    type: ERROR_INITIALISING,
    payload: { id, message }
});
const updateStandup = standup => ({
    type: UPDATE,
    payload: { standup }
});

const loadStandup = name => ({ type: LOAD, payload: { name } });
const editStandup = (standup, onSuccess, onError) => ({ type: EDIT, payload: { standup, onSuccess: onSuccess, onError: onError } });
const createStandup = (standup, onSuccess, onError) => ({ type: CREATE, payload: { standup, onSuccess: onSuccess, onError: onError } });

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

export const types = {
    GET_BY_NAME,
    INITIALISE,
    JOIN,
    LOAD,
    ERROR_INITIALISING,
    START,
    UPDATE,
    PAUSE,
    NEXT_SPEAKER,
    RESET,
    UNPAUSE,
    LEAVE,
    EDIT,
    CREATE
};
