import axios from 'axios';
import { API_SERVER_URL } from '../config/constants';
import CountdownError from "../utils/errors/CountdownError";

const baseUrl = API_SERVER_URL;

const getStandupByName = (name) => (
    axios.get(baseUrl + "/standups/" + name)
    .then(res => res.data)
    .catch(err => {throw new Error("Unable to retrieve standup")})
);

const getAllStandups = () => (
    axios.get(baseUrl + "/standups")
    .then(res => res.data)
    .catch(err => console.log(err))
);

const isStandupLive = name => (
    axios.get(baseUrl + `/standups/${name}/status`)
        .then(res => res.status === 200)
        .catch(err => false)
);

const editStandup = standup => (
    axios.put(baseUrl + '/standups', standup)
        .then(res => res.status === 200)
        .catch(err => {
            throw new CountdownError(err.response.status, err.response.data)
        })
);

const createStandup = standup => (
    axios.post(baseUrl + '/standups', standup)
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