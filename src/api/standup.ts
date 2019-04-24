import axios from 'axios';
import { API_SERVER_URL } from '../config/constants';
import CountdownError from "../utils/errors/CountdownError";
import { Standup } from '../../@types/countdown';

const baseUrl = API_SERVER_URL;
const standupUrl = (slug: string = "") => baseUrl + "/standups" + slug + "?timestamp=" + new Date().toLocaleTimeString();

const getStandupByName = (name: string) => (
    axios.get(standupUrl(`/${name}`))
    .then(res => res.data)
    .catch(err => {throw new Error("Unable to retrieve standup")})
);

const getAllStandups = () => (
    axios.get(standupUrl())
    .then(res => res.data)
    .catch(err => console.log(err))
);

const isStandupLive = (name: string) => (
    axios.get(standupUrl(`/${name}/status`))
        .then(res => res.status === 200)
        .catch(err => false)
);

const editStandup = (standup: Standup) => (
    axios.put(standupUrl(), standup)
        .then(res => res.status === 200)
        .catch(err => {
            throw new CountdownError(err.response.status, err.response.data)
        })
);

const createStandup = (standup: Standup) => (
    axios.post(standupUrl(), standup)
        .then(res => res.status === 201)
        .catch(err => {
            throw new CountdownError(err.response.status, err.response.data)
        })
);

export default {
    getStandupByName,
    getAllStandups,
    isStandupLive,
    editStandup,
    createStandup
}