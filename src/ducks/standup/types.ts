import { Standup, StandupUpdate, TeamWithRandomNumber } from '../../../@types/countdown';

export interface StandupState {
    id: number;
    name: string;
    teams: TeamWithRandomNumber[];
    displayName: string;
    currentTeam: string;
    currentSpeaker: string;
    time: number;
    live: boolean;
    paused: boolean;
}

export enum StandupActionTypes {
    GET_BY_NAME = "duck/standup/GET_BY_NAME",
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
    CREATE = "duck/standup/CREATE",
    EDIT = "duck/standup/EDIT",
    RESET = "duck/standup/RESET"
}