import axios from 'axios';
import { API_SERVER_URL } from '../config/constants';
import CountdownError from "../utils/errors/CountdownError";
import { Team, TeamDto } from '../../@types/countdown';

const baseUrl = API_SERVER_URL;
const standupUrl = (slug: string = "") => baseUrl + "/standups" + slug + "?timestamp=" + new Date().toLocaleTimeString();

const getTeamByName = (name: string) => (
    axios.get(standupUrl(`/${name}`))
    .then(res => res.data)
    .catch(err => {throw new Error("Unable to retrieve team")})
);

const getAllTeams = () => (
    axios.get(standupUrl())
    .then(res => res.data)
    .catch(err => console.log(err))
);

const isStandupLive = (name: string) => (
    axios.get(standupUrl(`/${name}/status`))
        .then(res => res.status === 200)
        .catch(err => false)
);

const editTeam = (team: TeamDto) => (
    axios.put(standupUrl(), team)
        .then(res => res.status === 200)
        .catch(err => {
            throw new CountdownError(err.response.status, err.response.data)
        })
);

const createTeam = (team: TeamDto) => (
    axios.post(standupUrl(), team)
        .then(res => res.status === 201)
        .catch(err => {
            throw new CountdownError(err.response.status, err.response.data)
        })
);

export default {
    getTeamByName,
    getAllTeams,
    isStandupLive,
    editTeam,
    createTeam
}