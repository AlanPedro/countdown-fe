export interface StandupState {
    currentTeam: string;
    currentSpeaker: string;
    time: number;
    live: boolean;
    paused: boolean;
}

export enum StandupActionTypes {
    INITIALISE = "duck/standup/INITIALISE",
    ERROR_INITIALISING = "duck/standup/ERROR_INITIALISING",
    JOIN = "duck/standup/JOIN",
    LOAD = "duck/standup/LOAD",
    START = "duck/standup/START",
    UPDATE = "duck/standup/UPDATE",
    PAUSE = "duck/standup/PAUSE",
    UNPAUSE = "duck/standup/UNPAUSE",
    NEXT_SPEAKER = "duck/standup/NEXT_SPEAKER",
    LEAVE = "duck/standup/LEAVE",
    RESET = "duck/standup/RESET"
}