// standup.js

// Types
const GET_ALL = "duck/standup/GET_ALL";
const GET_BY_NAME = "duck/standup/GET_BY_NAME";
const INITIALISE = "duck/standup/INITIALISE";
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
            return action.payload.standup;
        case UPDATE:
            const { name, remaining, status } = action.payload.standup;
            return {
                team: state.team,
                currentSpeaker: name,
                time: status === "paused" ? state.time : remaining,
                name: state.name
            }; 
        default:
            return state;
    }
}

// Actions
const getAllStandups = () => ({ type: GET_ALL });
const startStandup = () => ({ type: START })
const pauseStandup = () => ({ type: PAUSE });
const toNextSpeaker = () => ({type: NEXT_SPEAKER});

const getStandup = name => ( {
    type: GET_BY_NAME,
    payload: { name }
});

const initialiseStandup = standup => ( { 
    type: INITIALISE,
    payload: { standup }
});

const errorInitialisingStandup = (id, message) => ( { 
    type: INITIALISE,
    payload: { id, message }
});

const updateStandup = standup => ({
    type: UPDATE,
    payload: { standup }
});


export const actions = {
    getAllStandups,
    getStandup,
    initialiseStandup,
    errorInitialisingStandup,
    startStandup,
    updateStandup,
    pauseStandup,
    toNextSpeaker
}

export const types = {
    GET_ALL,
    GET_BY_NAME,
    INITIALISE,
    ERROR_INITIALISING,
    START,
    UPDATE,
    PAUSE,
    NEXT_SPEAKER,
    RESET
}
