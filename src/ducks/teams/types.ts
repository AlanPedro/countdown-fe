// allStandups.ts
import { TeamNames } from '../../../@types/countdown';

// Typing for allTeams slice of state
export type TeamsState = TeamNames[]

// Types
export enum AllTeamsActionTypes {
    GET_ALL = "duck/teams/GET_ALL_STANDUPS",
    GET_ALL_SUCCESS = "duck/teams/GET_ALL_SUCCESS",
    GET_ALL_FAILURE = "duck/teams/GET_ALL_FAILURE"
}

export interface GetAllTeamsAction {
    type: typeof AllTeamsActionTypes.GET_ALL;
}
export interface GetAllTeamsSuccessAction {
    type: typeof AllTeamsActionTypes.GET_ALL_SUCCESS;
    payload: { teams: TeamNames[] };
}
export interface GetAllTeamsFailureAction {
    type: typeof AllTeamsActionTypes.GET_ALL_FAILURE;
    payload: { message: string };
}
  
export type TeamsAction = GetAllTeamsAction | GetAllTeamsSuccessAction | GetAllTeamsFailureAction
