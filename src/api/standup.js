import axios from 'axios';
import { API_SERVER_URL } from '../config/constants';

const baseUrl = API_SERVER_URL;

const getStandupByName = (name) => (
    axios.get(baseUrl + "/standups/" + name)
    .then(res => res.data)
    .catch(err => {throw new Error("Unable to retrieve standup")})
)

const getAllStandups = () => (
    axios.get(baseUrl + "/standups")
    .then(res => res.data)
    .catch(err => console.log(err))
)

export default {
    getStandupByName,
    getAllStandups
}