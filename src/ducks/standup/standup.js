// standup.js

// Types
const GET_ALL = "duck/standup/GET_ALL";
const GET_BY_NAME = "duck/standup/GET_BY_NAME";
const INITIALISE = "duck/standup/INITIALISE";
const JOIN = "duck/standup/JOIN";
const LOAD = "duck/standup/LOAD";
const ERROR_INITIALISING = "duck/standup/ERROR_INITIALISING";
const START = "duck/standup/START";
const UPDATE = "duck/standup/UPDATE";
const PAUSE = "duck/standup/PAUSE";
const NEXT_SPEAKER = "duck/standup/NEXT_SPEAKER"
const RESET = "duck/standup/RESET";

// Reducer
export default function reducer(state = {}, action) {
    switch(action.type) {
        case INITIALISE:
            const { standup } = action.payload;
            const first = standup.teams.find(_ => true);
            return {
                teams: standup.teams,
                name: standup.name,
                currentTeam: first.name,
                currentSpeaker: first.speaker,
                time: first.allocationInSeconds
            }
        case UPDATE:
            const { name, speaker, remainingSeconds, status } = action.payload.standup;
            return {
                teams: state.teams,
                currentTeam: name,
                currentSpeaker: speaker,
                time: status === "paused" ? state.time : remainingSeconds,
                name: state.name
            }; 
        case ERROR_INITIALISING:
            console.log("Error getting standup");
            return state;
        default:
            return state;
    }
}

// Actions
const getAllStandups = () => ({ type: GET_ALL });
const startStandup = () => ({ type: START })
const pauseStandup = () => ({ type: PAUSE });
const toNextSpeaker = () => ({type: NEXT_SPEAKER});
const joinStandup = name => ({ type: JOIN, payload: { name } })
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

export const actions = {
    getAllStandups,
    initialiseStandup,
    loadStandup,
    errorInitialisingStandup,
    startStandup,
    updateStandup,
    pauseStandup,
    toNextSpeaker,
    joinStandup
}

export const types = {
    GET_ALL,
    GET_BY_NAME,
    INITIALISE,
    JOIN,
    LOAD,
    ERROR_INITIALISING,
    START,
    UPDATE,
    PAUSE,
    NEXT_SPEAKER,
    RESET
}
