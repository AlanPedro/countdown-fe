import { ProjectNames } from '../../../@types/countdown';

export type ProjectState = ProjectNames[];

export enum ProjectActionTypes {
    GET_ALL = "duck/projects/GET_ALL",
    GET_ALL_SUCCESS = "duck/projects/GET_ALL_SUCCESS",
    GET_ALL_FAILURE = "duck/projects/GET_ALL_FAILURE"
}