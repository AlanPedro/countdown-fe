// allStandups.ts
import { StandupNames } from '../../../@types/countdown';

// Typing for allStandups slice of state
export type AllStandupsState = StandupNames[]

// Types
export enum AllStandupsActionTypes {
    GET_ALL = "duck/availableStandups/GET_ALL_STANDUPS",
    GET_ALL_SUCCESS = "duck/availableStandups/GET_ALL_SUCCESS",
    GET_ALL_FAILURE = "duck/availableStandups/GET_ALL_FAILURE"
}

export interface GetAllStandupsAction {
    type: typeof AllStandupsActionTypes.GET_ALL;
}
export interface GetAllStandupsSuccessAction {
    type: typeof AllStandupsActionTypes.GET_ALL_SUCCESS;
    payload: { standups: StandupNames[] };
}
export interface GetAllStandupsFailureAction {
    type: typeof AllStandupsActionTypes.GET_ALL_FAILURE;
    payload: { message: string };
}
  
export type AllStandupsActions = GetAllStandupsAction | GetAllStandupsSuccessAction | GetAllStandupsFailureAction
