import { TeamWithRandomNumber} from "../../../@types/countdown";

export type TeamState = TeamWithRandomNumber;

export enum TeamActionsTypes {
    GET_BY_NAME = "ducks/team/GET_BY_NAME",
    GET_BY_NAME_SUCCESS = "ducks/team/GET_BY_NAME_SUCCESS",
    GET_BY_NAME_FAILURE = "ducks/team/GET_BY_NAME_FAILURE",
    CREATE = "ducks/team/CREATE",
    EDIT = "ducks/team/EDIT"
}
