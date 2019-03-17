import axios from 'axios';
// import { SERVER_URL } from '../config/constants';

// const baseUrl = SERVER_URL;
const baseUrl = "http://172.22.121.28:9000";

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